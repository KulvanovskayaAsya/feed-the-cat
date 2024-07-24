import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = Router()

const BASE_ROUTE = '/user'

router.post(BASE_ROUTE, createUser)
router.get(BASE_ROUTE, getUsers)
router.get(`${BASE_ROUTE}/:id`, getUserById)
router.put(`${BASE_ROUTE}/:id`, updateUser)
router.delete(`${BASE_ROUTE}/:id`, deleteUser)

export default router
