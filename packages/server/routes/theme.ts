import { Router } from 'express'
import { themeService } from '../services/Theme'
import { userThemeService } from '../services/UserTheme'

const router = Router()

const BASE_ROUTE = '/theme'

router.get(`${BASE_ROUTE}/:userId`, async (req, res) => {
  const userId = req.params?.userId

  const result = await userThemeService.find({
    userId: Number(userId),
  })
  res.send(result)
})

router.post(`${BASE_ROUTE}/:userId`, async (req, res) => {
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

router.put(BASE_ROUTE, async (req, res) => {
  let rawBody = ''

  req.on('data', chunk => {
    rawBody += chunk
  })

  req.on('end', async () => {
    await themeService.create(JSON.parse(rawBody))
    await res.json({})
  })
})

export default router
