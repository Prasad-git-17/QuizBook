import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <div className='m-3 grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 bg-black text-white '>
        <div className='m-3  flex flex-col justify-center items-center'>
            <h1 className='font-bold'>Quiz Book</h1>
            <p>Copyright@prasad</p>
        </div>
        <div className='m-3  flex flex-col justify-center items-center'>
            <h1 className='font-bold'>USEFUL LINKS</h1>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/allQuiz'}>Quizs</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
            </ul>
        </div>
       
        <div className='m-3  flex flex-col justify-center items-center'>
            <h1 className='font-bold'>CONTACT</h1>
            <h1>123 XYZ Road BSK 3</h1>
            <h1>Maharashtra,Pune,IN</h1>
        </div>
         <div className='m-3  flex flex-col justify-center items-center'>
            <h1 className='font-bold'>SOCIAL</h1>
            <ul>
                <li>Facebook</li>
                <li>YouTube</li>
                <li>Twitter</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
