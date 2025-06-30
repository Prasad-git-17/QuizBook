import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen'>
      <div className='m-2' >
        <h1 className='m-4 ml-12 text-xl font-bold '>About QuizBook Project</h1>
        <p className='ml-12 mr-12 font-medium'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
This QuizBook platform is a personal project built to demonstrate my skills as a full-stack web developer using the MERN stack (MongoDB, Express.js, React, Node.js). The application features user authentication, full CRUD operations for blog posts, and a protected admin panel for managing content.

I developed this project to gain deeper experience with RESTful APIs, token-based authentication (JWT), state management using Redux, and responsive design. The frontend is built in React with React Router for navigation, and the backend uses Express.js and MongoDB for handling data and user sessions.

Although this is a sample project, it is fully functional and designed to reflect the workflow and structure of a real-world quiz App platform.
    </p>
      </div>
      <div className='mt-4'>
        <h1 className='text-xl font-bold  ml-12'>Students</h1>
          <p className='ml-12 mr-12 '>This quiz app is designed to help students prepare effectively for
            competitive exams by offering subject-wise practice in General Knowledge,
            Math, Polity, Science, History, and English. With carefully curated
            multiple-choice questions, students can strengthen their understanding,
            identify weak areas, and improve accuracy and speed — all in a fun,
            interactive format. Whether you're preparing for government exams,
            entrance tests, or school assessments, this app is a smart way to
            stay exam-ready.

          </p>
      </div>
      <div className='mt-4'>
        <h1 className='text-xl font-bold ml-12'>Teachers</h1>
          <p className='ml-12 mr-12 '>
            Teachers can use the app’s custom quiz feature to create and
             share personalized quizzes with their students. This makes it
              easy to conduct online assessments, homework practice, or 
              topic-specific tests — without needing any technical setup. 
              The platform is simple to use, saves time, and supports engaging, 
              interactive learning both inside and outside the classroom.
          </p>
          
      </div>
    </div>
  )
}

export default About
