import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
const secretKey=process.env.SECRET_KEY
export const signUp= async (req,res)=>{
    const {name,email,password,role}=req.body
    let roleOfUser=['admin','user']
     
    if(!name||!email || !password || ! role){
        return res.json({message:'all feilds are required'})
    }

    const existingUser=await User.findOne({email}) 
    if(existingUser){
        return res.json({message:'Email already in use'})
    }
        
    if(!roleOfUser.includes(role)){
       return res.json({message:"this Role not allowed"})
    }
    const hashPassword =await bcrypt.hash(password,10)
    try {
        const userData= await User.create({
            name,
            email,
            password :hashPassword,
            role
        })
        return res.json({message:'user sing up sucssesfull',success:true})
    } catch (error) {
        console.log('error happns during singing up user');
        
    }
}


export const userLogin =async(req,res)=>{

    const {email,password}=req.body
 
    try {
           const user=await User.findOne({email:email})
    if(!user){
        return res.json({message:'invalid email '})
    }

     const isPasswordCorrrect= await bcrypt.compare(password,user.password)
     if(!isPasswordCorrrect){
        return res.json({message:'invalid password'})
     }

    const token= jwt.sign({id:user._id,role:user.role},secretKey,{expiresIn: '1d'})
     res.cookie('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'Strict',
      maxAge:3600000
     })

     res.json({success:true,message:'login success',role:user.role ,userId:user._id})

    } catch (error) {
         console.log('error happns during logged in  user');
    }

}


export const getAllUsers= async (req,res)=>{

    try {
        const allusers= await User.find()
        if(!allusers){
            return res.json({message:'user data not found'})
        }
        return res.json({message:' all user data',allusers})
    } catch (error) {
         console.log('error happns to fetching user data');
    }
}

export const logOut=async(req,res)=>{

    res.clearCookie('token',
        {
      httpOnly:true,
      secure:true,
      sameSite:'Strict',
      maxAge:3600000
     }
    )
 return res.json({message:'looged out successfully'})

}