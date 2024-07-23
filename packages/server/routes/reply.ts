import { Router } from 'express'
import {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  deleteReply,
} from '../controllers/reply'

const router = Router()

router.post('/reply', createReply)
router.get('/reply/:commentId', getReplies)
router.get('/reply/:id', getReplyById)
router.put('/reply/:id', updateReply)
router.delete('/reply/:id', deleteReply)

export default router
