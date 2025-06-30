import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate} from 'react-router-dom'
const apiUrl=import.meta.env.VITE_API_URL
const Dashboard = () => {
    const {id}=useParams()
   const navigate=useNavigate()
    const [admin,setAdmin]=useState([])
    useEffect(()=>{
        
     const adminFun=async()=>{
      try {
        const adminData=await axios.get(`${apiUrl}/api/v1/getQueById/${id}`,{
        withCredentials: true
      })
       // console.log(adminData.data);
       // console.log(adminData.data.success);
        setAdmin(adminData.data.questionById)
        if(adminData.data.success){
                //setQuiz(res.data.subjectQuiz)
            
            }else{
              navigate('/login')
            }
           
        
        
      } catch (error) {
        console.log('error happns to show admin data',error);
        
      }
     }
     adminFun()
    },[id])

    const handleDelete =async(id)=>{
        try {
          const deleteTest= await axios.delete(`${apiUrl}/api/v1/deleteQuiz/${id}`,{
        withCredentials: true
      })
          //console.log(deleteTest.data);
          let updatedDash=admin.filter((data)=>data._id !== id)
          //console.log(updatedDash);
          setAdmin(updatedDash)
          
          
        } catch (error) {
          console.log('error happns during delete quiz');
          
        }
    }

  return (
    <div className='min-h-screen' >
      <button className='m-4 text-xl text-white font-bold bg-blue-600 hover:bg-blue-400 hover:text-black  pl-2 pr-2 rounded'
      onClick={()=>{navigate(`/addQuiz/${id}`)}}
      >Add New Quiz</button>
      <div className='border m-3'>
      <div>
         <div className=' flex justify-between items-center m-1 text-md sm:text-xl  p-1 font-semibold  bg-blue-300'>
          <div className='w-[10%] ml-2'>
            <h1>No</h1>
          </div>
            <div className='w-[30%] ml-2 '>
              <h1>Title</h1>
            </div>
            <div className='w-[20%] ml-2 '>
               <h1>Subject</h1>
            </div>
            <div className='w-[20%] ml-2'>
               <button>delete</button>
            </div>
            <div className='w-[20%] ml-2'>
                  <button>View</button>
            </div>
        </div>
      </div>
      <div className=' m-3'>
        {admin?.map((data,index)=>{
          return <div key={index} className=' text-md sm:text-xl flex justify-between items-center m-1 '>
            <div className='w-[10%] ml-2'>
            <h1>{index+1}</h1>
          </div>
           
            <div className='w-[30%] ml-2 '>
              <h1>{data.title}</h1>
            </div>
            <div className='w-[20%] ml-2'>
               <h1>{data.subject}</h1>
            </div>
            <div className='w-[20%] ml-2 '>
               <button className='bg-red-500 pl-1 pr-1 text-white  font-semibold rounded'
               onClick={()=>{handleDelete(data._id)}}
               >delete</button>
            </div>
            <div className='w-[20%] ml-2 '>
                  <button className='bg-green-500 pl-1 pr-1 text-white  font-semibold rounded'
                  onClick={()=>{navigate(`/quiz/test/${data._id}`)}}
                  >View</button>
            </div>
        </div>
        })}
 
      </div>
      </div>
    </div>
  )
}

export default Dashboard
