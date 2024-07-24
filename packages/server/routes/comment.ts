import { Router } from 'express'
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} from '../controllers/comment'

const router = Router()

const BASE_ROUTE = '/comment'

router.post(BASE_ROUTE, createComment)
router.get(`${BASE_ROUTE}/:topicId`, getComments)
router.get(`${BASE_ROUTE}/:id`, getCommentById)
router.put(`${BASE_ROUTE}/:id`, updateComment)
router.delete(`${BASE_ROUTE}/:id`, deleteComment)

export default router
