import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
const ProtectedRout = () => {
  const isLogged=useSelector((state)=>state.Auth.isLogged)
      if(isLogged){
        return   <Outlet/>
      }else{
      return < Navigate to='/login'/>
      }

    
  
}

export default ProtectedRout
