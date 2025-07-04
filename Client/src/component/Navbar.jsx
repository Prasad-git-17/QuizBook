import React, { useState } from 'react'
import { Link, useNavigate ,useParams} from "react-router-dom"
import { CiMenuBurger } from "react-icons/ci"
import axios from 'axios'
import { useDispatch ,useSelector } from 'react-redux'
import {checkLogIn,checkUser} from '../redux/AuthSlice'
const apiUrl=import.meta.env.VITE_API_URL
const Navbar = () => {
    const {id}=useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const userId=useSelector((state)=>state.Auth.userId)
    const userRole = useSelector((state) => state.Auth.role)
     const isLogged=useSelector((state)=>state.Auth.isLogged)
    //console.log(userId);
    
     
    const dispatch=useDispatch()

    const handleLogOut = async () => {
        try {
            const logOut = await axios.post(`${apiUrl}/api/v1/user/logOut`, {}, {
                withCredentials: true
            })
            alert(logOut.data.message);
            navigate('/')
            dispatch(checkLogIn(false))
            dispatch(checkUser('guest'))

        } catch (error) {
            console.log('error happns during logout', error);

        }

    }
    //console.log(isLogged);
 //console.log(isLogged1);
    return (
        <div className='sticky top-0 z-15'>
            <div className='p-2 border-b-2 border-gray-300 bg-white'>
                <div className='flex justify-between items-center'>
                    <h1 className='ml-3  cursor-pointer font-black text-2xl'>Quiz <span className='text-3xl font-bold text-blue-600'>B</span>ook</h1>
                    <div className='hidden sm:block'>
                        <ul className='flex justify-between items-center'>
                            <li className='m-2 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/'}>Home</Link></li>
                            <li className='m-2 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/allQuiz'}>Quizs</Link></li>
                            <li className='m-2 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/about'}>About</Link></li>
                            <li className='m-2 font-semibold cursor-pointer hover:text-blue-600  '><Link to={'/contact'}>Contact</Link></li>
                            <li className={`${userRole === "admin" ? 'block' : 'hidden'}  m-2 font-semibold cursor-pointer hover:text-blue-600 `} ><Link to={`/dashboard/${userId}`}>Dashboared</Link></li>
                        </ul>
                    </div>

                    <div className='flex justify-between mr-1'>

                        <button className={`${isLogged ? 'block' : 'hidden'} bg-blue-600 mr-2  rounded-md pl-2  pr-2 cursor-pointer text-white font-bold`} onClick={() => { handleLogOut() }}>logOut</button>
                        <button className={`${isLogged? 'hidden' : 'block'} bg-blue-600 mr-2  rounded-md pl-2  pr-2 cursor-pointer text-white font-bold `} onClick={() => { navigate('/singUp') }}>SignUp</button>

                        <button
                            className='  text-xl h-5  w-5 mr-2  cursor-pointer  sm:hidden'
                            onClick={() => { setOpen(!open) }}
                        ><CiMenuBurger /></button>




                    </div>

                </div>
            </div>
            <div className={`${open ? "block" : "hidden"} sm:hidden border ml-5 mr-5 m-1 bg-white`}>
                <ul className='flex justify-between items-center flex-col'>
                    <li className='m-1 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/'}>Home</Link></li>
                    <li className='m-1 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/allQuiz'}>ALLQuizs</Link></li>
                    <li className='m-1 font-semibold cursor-pointer hover:text-blue-600 '><Link to={'/about'}>About</Link></li>
                    <li className='m-1 font-semibold cursor-pointer hover:text-blue-600  '><Link to={'/contact'}>Contact</Link></li>
                    <li className={` ${userRole === "admin" ? 'block' : 'hidden'} m-2 font-semibold cursor-pointer hover:text-blue-600 `}><Link to={'/addQuiz'}>Dashboared</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
