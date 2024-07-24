import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import { connectToPostrgess } from './sequelize'
import { themeService } from './services/Theme'
import { userThemeService } from './services/UserTheme'

const port = Number(process.env.SERVER_PORT) || 3001
const clientPath = path.join(__dirname, '../client')
const isDev = process.env.NODE_ENV === 'development'

connectToPostrgess()

async function createServer() {
  const app = express()
  app.use(cors())
  app.disable('x-powered-by').enable('trust proxy')

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

  app.get('/user', (_, res) => {
    res.json({
      id: 1,
      first_name: 'John',
      second_name: 'Doe',
      display_name: 'johndoe',
      phone: '1234567890',
      login: 'johndoe',
      avatar: '',
      email: 'johndoe@example.com',
    })
  })

  app.get('/theme/:userId', async (req, res) => {
    const userId = req.params?.userId

    const result = await userThemeService.find({
      userId: Number(userId),
    })
    res.send(result)
  })

  app.post('/theme/:userId', async (req, res) => {
    const userId = req.params?.userId
    let rawBody = ''

    req.on('data', chunk => {
      rawBody += chunk
    })

    req.on('end', async () => {
      const themeObj = JSON.parse(rawBody)
      await userThemeService.set({
        userId,
        themeId: Number(themeObj.theme),
      })
      res.send({})
    })
  })

  app.put('/theme', async (req, res) => {
    let rawBody = ''

    req.on('data', chunk => {
      rawBody += chunk
    })

    req.on('end', async () => {
      await themeService.create(JSON.parse(rawBody))
      await res.json({})
    })
  })

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
