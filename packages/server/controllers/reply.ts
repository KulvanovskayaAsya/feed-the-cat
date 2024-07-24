import { Request, Response } from 'express'
import { Reply } from '../models/reply'

export const createReply = async (req: Request, res: Response) => {
  const { content, commentId, parentId } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const reply = await Reply.create({
      content: content,
      commentId: commentId,
      parentId: parentId,
      userId: Number(userId),
    } as Reply)
    return res.status(201).json(reply)
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export const getReplies = async (req: Request, res: Response) => {
  const { commentId } = req.params

  try {
    const replies = await Reply.findAll({ where: { commentId } })
    res.json(replies)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getReplyById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const reply = await Reply.findByPk(id)
    if (reply) {
      res.json(reply)
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const updateReply = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content } = req.body

  try {
    const reply = await Reply.findByPk(id)
    if (reply) {
      reply.content = content
      await reply.save()
      res.json(reply)
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const deleteReply = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const reply = await Reply.findByPk(id)
    if (reply) {
      await reply.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
