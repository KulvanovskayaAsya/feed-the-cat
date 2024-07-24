// @ts-nocheck
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import axios from 'axios'

const YANDEX_API = 'https://ya-praktikum.tech/api/v2'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.headers.cookie
    if (!cookies) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const response = await axios.get(`${YANDEX_API}/auth/user`, {
      headers: { cookie: cookies },
      withCredentials: true,
    })

    if (response.status === 200) {
      const userData = response.data as User
      req.user = userData
      next()
    } else {
      res.status(401).json({ message: 'Not authenticated' })
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authenticated' })
  }
}
