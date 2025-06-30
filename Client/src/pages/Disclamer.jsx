import React from 'react'
import { useNavigate } from 'react-router-dom'

const Disclamer = () => {
  const navigate=useNavigate()
  return (
    <div className='h-[80vh]'>
    <div className='m-4 border mt-10 p-2'>
      <p>
        This app includes a custom quiz creation feature designed especially for teachers.
         By logging in as an admin, teachers can easily create, edit, and manage 
         subject-specific quizzes for their students. This makes it ideal for 
         conducting quick assessments, practice sessions, or revision tests. 
         The admin panel is simple to use, and requires no technical expertise —
          helping teachers save time and make learning more interactive.
      </p>
      <p className='mt-10'><span className='font-semibold text-red-700 text-xl'>Note </span>: Quiz creation is available only 
      for users logged in as  <span className='text-xl font-bold text-red-800 underline'>admin</span> .Contact us to request admin access if you're a teacher looking to 
         create your own quizzes.</p>
      <p>Would you like help writing a sample admin login guide or 
        access request message too?</p>
 
         <button className={` bg-blue-600 mt-2 rounded-md pl-2  pr-2 cursor-pointer text-white font-bold `} onClick={() => { navigate('/login') }}>Login</button>
    </div>
      
     </div>

  )
}

export default Disclamer
