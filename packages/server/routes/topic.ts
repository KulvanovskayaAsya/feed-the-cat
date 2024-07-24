import { Router } from 'express'
import {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} from '../controllers/topic'

const router = Router()

const BASE_ROUTE = '/topic'

router.post(BASE_ROUTE, createTopic)
router.get(BASE_ROUTE, getTopics)
router.get(`${BASE_ROUTE}/:id`, getTopicById)
router.put(`${BASE_ROUTE}/:id`, updateTopic)
router.delete(`${BASE_ROUTE}/:id`, deleteTopic)

export default router
