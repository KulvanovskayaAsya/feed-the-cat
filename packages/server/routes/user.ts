import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = Router()

router.post('/user', createUser)
router.get('/user', getUsers)
router.get('/user/:id', getUserById)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router
