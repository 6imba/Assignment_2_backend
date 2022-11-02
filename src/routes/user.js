import express from 'express'
const router = express.Router()
import {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn} from '../controller/user.js'

router.get('/', getAllUsers)
router.post('/', createNewUser)
router.get('/:id', getAUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/log-in', logIn)

export default router