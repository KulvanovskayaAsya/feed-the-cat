// @ts-nocheck
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.headers.cookie
    console.log('cookies = ', cookies)

    if (!cookies) {
      return res.status(401).json({ message: 'Кука где?!' })
    }

    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { cookie: cookies },
      credentials: 'include',
    })

    console.log(response)

    if (response.ok) {
      const userData = await response.json()
      req.user = userData
      next()
    } else {
      res.status(401).json({ message: 'Not authenticated' })
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
