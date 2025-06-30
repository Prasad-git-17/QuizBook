import mongoose from "mongoose";
import {User} from './userModel.js'
const questionSchema= new mongoose.Schema({
    question:{type:String,required:true},
    options:{type:[String],required:true},
    answer:{type:Number,required:true}
})

const quizSchema= new mongoose.Schema({
    title:{type:String,required:true},
    subject:{type:String,
        enum:['gk','math','polity','science','history','english'],
        required:true
    },
    allQuestion:[questionSchema],
    user:{type :mongoose.Schema.Types.ObjectId,
        ref:User
    }
})

export const Quiz =mongoose.model('Quiz', quizSchema)