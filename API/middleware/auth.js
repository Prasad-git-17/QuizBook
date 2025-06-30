
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import dotenv from "dotenv"
dotenv.config()

const secretKey=process.env.SECRET_KEY
export const authenticate= async(req,res,next)=>{
  // const token =req.header('Auth')
  const token =req.cookies.token
 // console.log(token);
  
   if(!token){
    return res.json({message:'login first..',success:false})
   }

   try {
      
       const decoded= jwt.verify(token,secretKey)
      //console.log(decoded);
      
      const id=decoded.id
      //console.log("id",id);
      

      const user = await User.findById(id)
      if(!user){
         return res.json({message:'user not exist'})
      }
      req.user=user
      //console.log(req.user);
      // return res.json({message:'user is authenticated'})
      
   next()
   } catch (error) {
      console.log('error in authentication'.error);
      
   }
   
     
}