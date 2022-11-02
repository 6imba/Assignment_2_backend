import express from 'express'
const router = express.Router()
import {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn} from '../controller/user.js'
import {auth} from '../middleware/authMiddleware.js'


router.get('/', auth, getAllUsers)
router.post('/', createNewUser)
router.get('/:id', getAUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', logIn)

export default router