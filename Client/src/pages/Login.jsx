import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { checkLogIn, checkUser ,addUserId} from '../redux/AuthSlice'
const apiUrl=import.meta.env.VITE_API_URL
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
 const isLogged=useSelector((state)=>state.Auth.isLogged)
 const role=useSelector((state)=>state.Auth.role)

const dispatch=useDispatch()
//  console.log(isLogged);
//   console.log(role);


  const handleLogin = async (e) => {
    e.preventDefault()
    const logIndata = {
      email: email,
      password: password
    }
    try {
      const loginRes = await axios.post(`${apiUrl}/api/v1/user/login`, logIndata, {
        withCredentials: true
      })
      alert(loginRes.data.message);
       // console.log(loginRes.data.userId);
   
   
      if(loginRes.data.success){
       dispatch(checkLogIn(loginRes.data.success))
       dispatch(checkUser(loginRes.data.role))
       dispatch(addUserId(loginRes.data.userId))
    
       
       if(loginRes.data.role==='admin'){
            navigate(`/dashboard/${loginRes.data.userId}`)
           // navigate(`/addQuiz`)
       }else{
           navigate('/allQuiz')
       }
       
      }
       
 
    } catch (error) {
      console.log('user Not found', error);
     

    }


  }
  return (
    <div className='h-[80vh] flex justify-center items-center'>
      <div className='border p-4 mb-2'>
        <h1 className='text-2xl font-bold'>LogIn</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-2'>
            <label>Email</label>
            <br />
            <input
              type='text'
              placeholder='Enter Name here.'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              className='focus:outline-none border'
            />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <br />
            <input
              type='password'
              placeholder='Enter Name here.'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className='focus:outline-none border '
            /></div>
          <div className='flex justify-between mt-4'>
            <button className='bg-blue-600 pl-2 pr-2 rounded text-white font-bold' type='submit'>Login</button>
            <button className='text-green-700 font-bold cursor-pointer' onClick={() => { navigate('/singUp') }} type='button'>SingUp..?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
