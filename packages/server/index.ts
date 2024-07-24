import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import { createClientAndConnect } from './db'

import { authMiddleware } from './utils/authMiddleware'

import topicRoutes from './routes/topic'
import commentRoutes from './routes/comment'
import replyRoutes from './routes/reply'

import serialize from 'serialize-javascript'

const port = Number(process.env.SERVER_PORT) || 3001
const clientPath = path.join(__dirname, '../client')
const isDev = process.env.NODE_ENV === 'development'

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}

createClientAndConnect()

async function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.use('/api', authMiddleware, topicRoutes)
  app.use('/api', authMiddleware, commentRoutes)
  app.use('/api', authMiddleware, replyRoutes)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>
      let template: string
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render
      }

      const { html: appHtml, initialState } = await render(req)
      const serializedInitialState = serialize(initialState, { isJSON: true })
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serializedInitialState}</script>`
        )

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
