import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const databaseUrl=process.env.MONGODB_URL
export const ConnectDB=async()=>{
        mongoose.connect(databaseUrl)
        .then((res)=>{console.log('mongodb connected succsesfully');
        }).catch((err)=>{
            console.log('error happans to connect mongoDb database',err);
            
        })



}