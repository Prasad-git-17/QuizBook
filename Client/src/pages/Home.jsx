import React from 'react'
import { BsBookHalf } from "react-icons/bs";
import QuizImage from '../assets/quiz.app.jpg'
import SbjectData from '../data/data.js'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  //console.log(SbjectData);
  const navigate = useNavigate()
  const handleSubject = (subject) => {

    navigate(`/quiz/${subject}`)
  }

  return (
    <div className=''>
      <div className='grid grid-cols-1 sm:grid-cols-2  m-2 mt-3 '>
        <div className='m-3 mt-4'>
          <h1 className='text-3xl   font-bold text-blue-600'>Quiz Book app is here</h1>
          <p className='text-[15px] mt-3 md:mt-10 '>
            Welcome to the ultimate quiz experience! Test your knowledge across a variety of topics,
            from general trivia to specialized subjects. Challenge yourself, track your progress,
            and have fun while learning something new every day! </p>
          <h1 className='mt-2 text-xl font-bold text-blue-800  '>Want to create own quiz ?</h1>
          <button className='text-xl font-bold bg-blue-600 rounded pl-2 pr-2 text-white mt-3'
            onClick={() => { navigate('/disclamer') }}
          >
            Click here</button>
        </div>
        <div className='flex justify-center items-center '>
          <img className='rounded-xl h-[80%] w-[90%]' src={QuizImage} alt="quiz image is here" />
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold ml-4 mt-3'>All Subjects Quizs</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-2'>
          {SbjectData.map((data, index) => {
            return <div key={index}>
              <div className='m-2 border-1 p-3'>
                <h1 className='text-xl font-semibold text-center'>{data.subTitle}</h1>
                <div className='flex justify-center mt-2 mb-2 '>
                  <BsBookHalf className='text-4xl' />
                </div>
                <div className='flex justify-center'>
                  <button className='text-[18px] pl-2 pr-2 rounded font-semibold bg-blue-500 text-white '
                    onClick={() => { handleSubject(data.subId) }}
                  >Click</button>
                </div>
              </div>
            </div>

          })
          }
        </div>

      </div>
    
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='m-3 border p-2'>
          <h1 className='text-xl font-bold mb-3'>Students</h1>
          <p>This quiz app is designed to help students prepare effectively for
            competitive exams by offering subject-wise practice in General Knowledge,
            Math, Polity, Science, History, and English. With carefully curated
            multiple-choice questions, students can strengthen their understanding,
            identify weak areas, and improve accuracy and speed — all in a fun,
            interactive format. Whether you're preparing for government exams,
            entrance tests, or school assessments, this app is a smart way to
            stay exam-ready.

          </p>
        </div>
        <div className='m-3 border p-2'>
          <h1 className='text-xl font-bold mb-3'>Teachers</h1>
          <p>
            Teachers can use the app’s custom quiz feature to create and
             share personalized quizzes with their students. This makes it
              easy to conduct online assessments, homework practice, or 
              topic-specific tests — without needing any technical setup. 
              The platform is simple to use, saves time, and supports engaging, 
              interactive learning both inside and outside the classroom.
          </p>
          
        </div>
      </div>
      <div className='m-3 border p-2'>
        <h1 className='text-md font-semibold text-red-600'>Note :</h1>
          <p className='text-sm'>
            This app includes a custom quiz creation feature designed especially 
            for teachers. By logging in as an admin, teachers can easily create, 
            edit, and manage subject-specific quizzes for their students.
            This makes it ideal for conducting quick assessments, practice sessions,
             or revision tests. The admin panel is simple to use, and requires no 
             technical expertise — helping teachers save time and make learning more 
             interactive.
          </p>
      </div>
    </div>
  )
}

export default Home
