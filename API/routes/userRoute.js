import express from 'express'
import { getAllUsers, logOut, signUp, userLogin } from '../controllers/userController.js'

const router=express.Router()

router.post('/user/signUp',signUp)
router.post('/user/login',userLogin)
router.get('/user/data',getAllUsers)
router.post('/user/logOut',logOut)






export default router