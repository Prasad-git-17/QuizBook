import mongoose from "mongoose";
import { Quiz } from "../models/quizModel.js";

export const addQuiz=async(req,res)=>{
    const {title,allQuestion,user,subject}=req.body
    let isSubject=['gk','math','polity','science','history','english']
     if(!title ){
      return res.json({message:'all feilds are required'})
     }
    if(allQuestion.length==0){
      return res.json({message:'all  quetions are required'})
    }
    if(!isSubject.includes(subject)){
      return res.json({message:'this is not valid subject'})
    }
    try {
      const quizData=await Quiz.create({title,allQuestion,user,subject})
      return res.json({message:'quiz created succsesfully',quizData ,success:true})  
    } catch (error) {
        console.log('error happans to creating quiz',error);
        
    }

}


export const getQuizData= async (req,res)=>{
       try {
        const allQuizData= await Quiz.find().populate('user','name')
        return res.json({message:'all quiz data is here',success:true,allQuizData})
       } catch (error) {
         console.log('error happans to getting  quiz data',error);
       }

}


export const getQuizDataById=async(req,res)=>{

        const userId =req.params.userId
  

    try {
      const questionById= await Quiz.find({user:userId})
      return res.json({message:'quesion by perticuler id ',questionById,success:true})
    } catch (error) {
       console.log('error happans to getting  question data',error);
    }
}


export const deleteQuizById=async(req,res)=>{
      const id =req.params.id
      try {
       const deletedQuiz = await Quiz.findByIdAndDelete(id)
       if(! deletedQuiz){
        return  res.json({message:'quiz not found'})
       }
       return res.json({message:'quiz deleted succsesfully',success:true})
      } catch (error) {
        console.log('error happans to getting  question data',error);
      }



}



export const updateQuizById = async(req,res)=>{

         const id =req.params.id
         const {title,allQuestion,subject}=req.body
       try {
        const updatedQuiz= await Quiz.findByIdAndUpdate(id, req.body,{new:true})
        return res.json({message:'quiz is updated succsesfully',updatedQuiz,success:true})
       } catch (error) {
        console.log('error happans to updating  question data',error);
       }

}

export const getQuizBySubject=async (req,res)=>{
     
  const sub=req.params.sub
   let isSubject=['gk','math','polity','science','history','english']
   if(!isSubject.includes(sub)){
      return res.json({message:'this is not valid subject'})
    }

  try {
    const subjectQuiz= await Quiz.find({subject:sub})
    return res.json({message:`quiz of subject ${sub} is found`,subjectQuiz,success:true})
  } catch (error) {
    console.log('error happans to geting subject quiz data',error);
  }

}





export const getTestByTestId=async(req,res)=>{

        const testId =req.params.testId
  

    try {
      const questionById= await Quiz.find({_id:testId})
      return res.json({message:'quiz is here  ',questionById ,success:true})
    } catch (error) {
       console.log('error happans to getting  question data',error);
    }
}