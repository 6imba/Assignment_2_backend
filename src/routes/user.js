import express from 'express'
const router = express.Router()
import {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn,logOut} from '../controller/user.js'
import {auth} from '../middleware/authMiddleware.js'
// import {auth,logAuth} from '../middleware/authMiddleware.js'


router.get('/health', (req, res)=>res.json({ok: true}))

router.get('/logout', logOut)
router.post('/login', logIn)
router.get('/', getAllUsers)
// router.get('/', auth, getAllUsers)
router.post('/', auth, createNewUser)
router.get('/:id', getAUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
// router.post('/login', logAuth, logIn)

export default router