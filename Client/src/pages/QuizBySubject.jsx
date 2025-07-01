import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
const apiUrl=import.meta.env.VITE_API_URL
const QuizBySubject = () => {
    const {subject}=useParams()
    const [quiz,setQuiz]=useState([])
    const navigate =useNavigate()
    useEffect(()=>{
    
    const quizSubject=async()=>{
         
        try {
            const res=await axios.get(`${apiUrl}/api/v1/subject/${subject}`,{
        withCredentials: true
      })
          //  console.log(res.data);
           // console.log(res.data.success);
            if(res.data.success){
                setQuiz(res.data.subjectQuiz)
            
            }else{
              navigate('/login')
            }
           
        } catch (error) {
            console.log('error happns in geting subject data',error);
            
        }

    }
    quizSubject()

    },[subject])
  return (
    <div className='h-[45vh] sm:min-h-[80vh]'>
      <div>
       <h1 className='text-center text-2xl font-bold'>{subject}</h1>
       <div>
        <div >
          {quiz.map((data,index)=>{
            return <div key={index} className='flex justify-between items-center border m-3'>
                <div className='ml-4 '>
            <h1 className='text-xl font-semibold'>{data.title}</h1>
            <h1 className='mt-1 mb-1 text-sm'>Total Quetion 25 || Total marks 25</h1>
          </div>
          <div className='mr-4'>
            <button className='text-md font-semibold bg-green-600 pl-2 pr-2 rounded text-white'
            onClick={()=>{navigate(`/quiz/test/${data._id}`)}}
            >Start</button>
          </div>

            </div>
          })
          || <div className='flex justify-center items-center h-[40vh]'
          ><h1 className='test-2xl text-red-600 font-bold'>Loading........</h1></div>}
          {/* <div className='ml-4 '>
            <h1 className='text-2xl font-semibold'>Title of quiz</h1>
            <h1 className='mt-1 mb-1'>Total Quetion 25 || Total marks 25</h1>
          </div>
          <div className='mr-4'>
            <button className='text-xl font-semibold bg-green-600 pl-2 pr-2 rounded text-white'>Start</button>
          </div> */}
        </div>
       </div>

      </div>
    </div>
  )
}

export default QuizBySubject
