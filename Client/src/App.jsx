import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import AllQuiz from './pages/AllQuiz'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './component/NotFound'
import Navbar from './component/Navbar'
import AddQuiz from './component/AddQuiz'
import SingUp from './pages/SingUp'
import Login from './pages/Login'
import Score from './pages/Score'
import ProtectedRout from './component/ProtectedRout'
import QuizBySubject from './pages/QuizBySubject'
import Footer from './component/Footer'
import Disclamer from './pages/Disclamer'
import Dashboard from './component/Dashboard'
import { useSelector } from 'react-redux'

const App = () => {
  const userRole = useSelector((state) => state.Auth.role)



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/singUp" element={<SingUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/score' element={<Score />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/quiz/:subject' element={<QuizBySubject />} />
        <Route path="/quiz/test/:id" element={<Quiz />} />
        <Route path="/disclamer" element={<Disclamer />} />



        <Route element={<ProtectedRout />}>
          {userRole === "admin" ? (<>
            <Route path="/addQuiz/:id" element={<AddQuiz />} />
            <Route path="/allQuiz" element={<AllQuiz />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/quiz/test/:id" element={<Quiz />} />


          </>) : (<>
            <Route path="/allQuiz" element={<AllQuiz />} />
            <Route path="/addQuiz/:id" element={<Login />} />
            <Route path="/quiz/test/:id" element={<Quiz />} />
            <Route path="/dashboard/:id" element={<Login />} />

          </>)}



        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App

