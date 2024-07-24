import { Router } from 'express'
import userRoutes from './user'
import topicRoutes from './topic'
import commentRoutes from './comment'
import replyRoutes from './reply'
import { authMiddleware } from '../utils/authMiddleware'

const router = Router()

router.use('/users', authMiddleware, userRoutes)
router.use('/topics', authMiddleware, topicRoutes)
router.use('/comments', authMiddleware, commentRoutes)
router.use('/replies', authMiddleware, replyRoutes)

export default router
