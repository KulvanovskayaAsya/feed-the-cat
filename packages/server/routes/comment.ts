import { Router } from 'express'

const router = Router()

router.post('/comment', createComment)
router.get('/comment/:topicId', getComments)
router.get('/comment/:id', getCommentById)
router.put('/comment/:id', updateComment)
router.delete('/comment/:id', deleteComment)

export default router
