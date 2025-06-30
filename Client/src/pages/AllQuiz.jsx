import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const apiUrl=import.meta.env.VITE_API_URL
const AllQuiz = () => {
  const [quiz, setQuiz] = useState([])
  const [subject,setSubject]=useState('gk')
  const navigate =useNavigate()
 


  useEffect(() => {
    const getData = async () => {
      try {
        const quizData = await axios.get(`${apiUrl}/api/v1/subject/${subject}`,{
          withCredentials:true
        })
       // console.log(quizData.data)
        //axios.get(`${apiUrl}/api/v1/subject/${subject}`)
        setQuiz(quizData.data.subjectQuiz) 

      } catch (error) {
        console.log('error happns to fetch  quiz data', error);

      }
    }
     getData()
    

  }, [subject])

  
  return (
    <div className='min-h-screen'>
    <div className=' m-2  flex justify-center'>
      <div className='w-[100%] md:w-[80%]'>
      <div className='flex justify-evenly items-center m-2 border flex-wrap'>
        <button className={`m-1 ${subject==='gk'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("gk")}>GK</button>
        <button key={'math'} className={`m-1 ${subject==='math'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("math")} >Math</button>
        <button key={'polity'} className={`m-1 ${subject==='polity'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("polity")}>Polity</button>
        <button key={'science'} className={`m-1 ${subject==='science'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("science")}>Science</button>
        <button key={'history'} className={`m-1 ${subject==='history'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("history")}>History</button>
        <button key={'english'} className={`m-1 ${subject==='english'? 'text-blue-600 font-bold':''}`} onClick={()=>setSubject("english")}>English</button>
      </div>
      <div className=' '>
        {quiz?.map((data,index)=>{
          return <div key={index} className='flex justify-between items-center border m-2'>
          <div>
            <h1 className='text-xl ml-2'>{data.title}</h1>
            <p className='ml-2'>{data.allQuestion.length} Questions {data.allQuestion.length} marks</p>
       
          </div>
          <div>
            <button className='mr-2 bg-green-600 text-md text-white pl-2 pr-2 rounded' onClick={()=>{navigate(`/quiz/test/${data._id}`)}}>Start</button>
          </div>

        </div>
                
        })} 
        

      </div>
      </div>
    </div>
    </div>
  )
}

export default AllQuiz
