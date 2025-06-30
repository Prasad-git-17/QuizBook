import express from 'express'
import { 
    addQuiz, getQuizData, getQuizDataById ,
    deleteQuizById, updateQuizById, getQuizBySubject, 
    getTestByTestId} from '../controllers/quizController.js'

import { authenticate } from '../middleware/auth.js'

const router=express.Router()

router.post('/postQuiz',authenticate,addQuiz)
router.get('/getQuiz',getQuizData)
router.get('/getQueById/:userId',authenticate,getQuizDataById)
router.delete('/deleteQuiz/:id',authenticate,deleteQuizById)
router.put('/updateQuiz/:id',authenticate,updateQuizById)
router.get('/subject/:sub',getQuizBySubject)
router.get('/getTestByTestId/:testId',getTestByTestId)



export default router