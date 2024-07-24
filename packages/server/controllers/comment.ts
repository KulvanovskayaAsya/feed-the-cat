import { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { Reply } from '../models/reply'

export const createComment = async (req: Request, res: Response) => {
  const { content, topicId } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const comment = await Comment.create({
      content: content,
      topicId: topicId,
      userId: Number(userId),
    } as Comment)
    return res.status(201).json(comment)
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export const getComments = async (req: Request, res: Response) => {
  const { topicId } = req.params

  try {
    const comments = await Comment.findAll({
      where: { topicId },
      include: [Reply],
    })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const comment = await Comment.findByPk(id, { include: [Reply] })
    if (comment) {
      res.json(comment)
    } else {
      res.status(404).json({ error: 'Comment not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content } = req.body

  try {
    const comment = await Comment.findByPk(id)
    if (comment) {
      comment.content = content
      await comment.save()
      res.json(comment)
    } else {
      res.status(404).json({ error: 'Comment not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const comment = await Comment.findByPk(id)
    if (comment) {
      await comment.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Comment not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
