import { Request, Response } from 'express'
import { Topic } from '../models/topic'
import { Comment } from '../models/comment'

export const createTopic = async (req: Request, res: Response) => {
  const { title, content } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const topic = await Topic.create({
      title: title,
      content: content,
      userId: Number(userId),
    } as Topic)
    return res.status(201).json(topic)
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export const getTopics = async (_: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({ include: [Comment] })
    res.json(topics)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const topic = await Topic.findByPk(id, { include: [Comment] })
    if (topic) {
      res.json(topic)
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, content } = req.body

  try {
    const topic = await Topic.findByPk(id)
    if (topic) {
      topic.title = title
      topic.content = content
      await topic.save()
      res.json(topic)
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const topic = await Topic.findByPk(id)
    if (topic) {
      await topic.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
