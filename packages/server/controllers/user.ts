// @ts-nocheck
import { Request, Response } from 'express'
import { User } from '../models/user'

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body

  try {
    const user = await User.create({ username, password, email })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { username, password, email } = req.body

  try {
    const user = await User.findByPk(id)
    if (user) {
      user.username = username
      user.password = password
      user.email = email
      await user.save()
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
