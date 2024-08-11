import { Router } from 'express'
import {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  deleteReply,
} from '../controllers/reply'

const router = Router()

const BASE_ROUTE = '/reply'

router.post(BASE_ROUTE, createReply)
router.get(`${BASE_ROUTE}/:commentId`, getReplies)
router.get(`${BASE_ROUTE}/:id`, getReplyById)
router.put(`${BASE_ROUTE}/:id`, updateReply)
router.delete(`${BASE_ROUTE}/:id`, deleteReply)

export default router
