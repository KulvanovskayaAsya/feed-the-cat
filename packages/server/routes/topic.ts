import { Router } from 'express'
import {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} from '../controllers/topic'

const router = Router()

router.post('/topic', createTopic)
router.get('/topic', getTopics)
router.get('/topic/:id', getTopicById)
router.put('/topic/:id', updateTopic)
router.delete('/topic/:id', deleteTopic)

export default router
