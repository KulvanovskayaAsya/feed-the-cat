import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.headers.cookie

    if (!cookies) {
      return res.status(401).json({ message: 'No cookie' })
    }

    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { cookie: cookies },
      credentials: 'include',
    })

    if (response.ok) {
      const userData = await response.json()

      req.user = userData
      return next()
    } else {
      res.status(401).json({ message: response })
    }
  } catch (error) {
    res.status(500).json({ message: 'Not authenticated' })
  }
}
