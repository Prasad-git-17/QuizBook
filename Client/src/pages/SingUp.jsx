import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const apiUrl=import.meta.env.VITE_API_URL
const SingUp = () => {
      const [name,setName]=useState('')
      const [email,setEmail]=useState('')
      const [password,setPassword]=useState('')
     // const [role,setRole]=useState('user')
      const navigate=useNavigate()
      const handleSubmit= async(e)=>{
        e.preventDefault()
     
        const singUpData ={
            name:name,
            email:email,
            password:password,
            role:'user'
        }
       // console.log(singUpData);
        
        try {
            const singUpRes= await axios.post(`${apiUrl}/api/v1/user/signUp`,singUpData,{
              withCredentials:true
            })
             //console.log(singUpRes.data);
             if(singUpRes.data.success===true){
               navigate('/allQuiz')
             }
            
            
        } catch (error) {
            console.log('error happns during singUp',error);
            
        }
      
      }
      
  return (
    <div className='  flex justify-center items-center h-[70vh] '>
      <div className='border p-4'>
        <h1 className='text-2xl font-bold mb-2'>SingUp</h1>
        <form onSubmit={handleSubmit}>
           <div className='mb-2'>
             <label className=''>Name</label>
             <br/>
             <input
             type='text'
             placeholder='Enter Name here.'
             value={name}
             onChange={(e)=>{setName(e.target.value)}}
                className='focus:outline-none border '
             />
           </div>
           <div className='mb-2'>
             <label>Email</label>
             <br/>
             <input
             type='text'
             placeholder='Enter Name here.'
             value={email}
             onChange={(e)=>{setEmail(e.target.value)}}
             className='focus:outline-none border'
             />
           </div>
           <div className='mb-2'> 
            <label>Password</label>
            <br/>
             <input
             type='password'
             placeholder='Enter Name here.'
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
                className='focus:outline-none border '
             /></div>
           {/* <div className='mb-2'>
            <label>Role</label>
            
            <select
            value={role}
            onChange={(e)=>{setRole(e.target.value)}}
            className='m-2 border focus: outline-none '
            >
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
            </select>
           </div> */}
           <div className='flex justify-between'>
         <button className='bg-blue-600 pl-2 pr-2 rounded text-white font-bold' type='submit'>SignUp</button>
         <button className='text-green-700 font-bold cursor-pointer' onClick={()=>{navigate('/login')}} type='button'>logIn..?</button>
           </div>
        </form>
        
      </div>
    </div>
  )
}

export default SingUp
