import express from "express"
import quizRouter from './routes/quizRoute.js'
import userRouter from './routes/userRoute.js'
import { ConnectDB } from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'
dotenv.config()

const app= express()
app.use(express.json())
app.use(cookieParser())
const port=process.env.PORT 
const frontendURL=process.env.FRONTEND_URL
app.use(cors({
    origin:frontendURL,
    methods:['GET','PUT','DELETE','POST'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}))


 

app.use('/api/v1',quizRouter)
app.use('/api/v1',userRouter)


app.listen(port,()=>{
    ConnectDB()
    console.log(`server is listening on port ${port}`);
    
})