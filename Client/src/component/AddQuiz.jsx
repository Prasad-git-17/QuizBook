import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL

const AddQuiz = () => {

  const { id } = useParams()
  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [answer, setAnswer] = useState(1)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('gk')


// stored index in local  storage

  const [index, setIndex] = useState(() => {
    const queId = localStorage.getItem('queId')
    return queId ? JSON.parse(queId) : 0
  })

  useEffect(() => {
    localStorage.setItem('queId', JSON.stringify(index))
  }, [index])


// Defined question Data Structure for each questions

  const questionData = {
    question: question,
    options: [option1, option2, option3, option4],
    answer: Number(answer)

  }


  // Defined data for local storage veriable quiz using useState() and useEffect()

  const data = {
    title: title,
    subject: subject,
    user: id,
    allQuestion: new Array(25).fill(null)

  }

  const [quiz, setQuiz] = useState(() => {
    const saved = localStorage.getItem('quiz')
    return saved && saved !== 'undefined' ? JSON.parse(saved) : data

  })

  useEffect(() => {
    localStorage.setItem('quiz', JSON.stringify(quiz))

  }, [quiz])

 

// Created function to update questions in quiz localstorage array

  const updateQuizArray = () => {
    const updatedQuiz = { ...quiz }


    updatedQuiz.allQuestion[index] = questionData

    setQuiz(prev => ({
      ...prev,
      quiz: updatedQuiz,


    }))


     setIndex(index + 1)

  }



  //function for adding question is here

  const handleAddQuestions = () => {

    if (quiz.allQuestion.length > index) {

      updateQuizArray()
      setQuestion('')
      setOption1('')
      setOption2('')
      setOption3('')
      setOption4('')


    } else {
      alert('this is your last question')
    }

  }

  // this function submit quiz to mongoDB database
  const handleSubmit = async (e) => {
    e.preventDefault()
    quiz.title = title
    quiz.subject = subject
    quiz.user = id

    try {
      if (index < quiz.allQuestion.length) {
     
        alert('please complete your questions')


      } else {
  
        const uplode = await axios.post(`${apiUrl}/api/v1/postQuiz`, quiz, {
          withCredentials: true
        })
        console.log(quiz);
        console.log(uplode.data.message);
        console.log(uplode.data);

        setQuiz({
          title: "",
          subject: "",
          user: '',
          allQuestion: new Array(25).fill(null)

        })
        localStorage.removeItem('quiz')
        localStorage.removeItem('queId')
        setIndex(0)

      }



    } catch (error) {
      console.log('error happns in uploding data', error);
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center items-center'>
        <div className='w-[90%] sm:w-[80%] lg:w-[75%] mt-4 mb-8'>
          <h1 className='m-1 text-2xl font-bold mt-2 text-center'>Dashboard</h1>
          <h1 className='m-1 text-xl font-bold text-red-700'>Add your own quiz</h1>
          <div className='m-1  bg-blue-100 p-2 mb-3'>
            <h1 className='text-xl font-bold text-blue-600'>Instruction</h1>
            <ul>
              <li>1. Enter Title First</li>
              <li>2. Select Subject you want</li>
              <li>3. Add question and option correctly</li>
              <li>4. Select answer correctly</li>
              <li>5. Click Add button to add question 1 by 1</li>
              <li>6. After filling all questions then click submit button</li>
            </ul>


          </div>
          < div className='border-1 m-1 p-1 '>
            <label className='text-xl font-semibold '>Title</label><br />
            <input
              required className='w-[100%] border  focus:outline-none mt-2'
              type='text' value={title} placeholder='Enter Title here'
              onChange={(e) => { setTitle(e.target.value) }} />
            <div className='pb-1 pt-1 flex justify-between items-center'>
              <div>
                <label className='text-lg font-semibold'>Subject : </label>
                <select
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value) }}
                  className='border ml-2 focus:outline-none '
                >
                  <option value="gk">GK</option>
                  <option value="math">Math</option>
                  <option value="polity">Polity</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="english">English</option>
                </select>
              </div>
              <div className='mr-4'>
                <h1> <span className='font-semibold text-lg'>
                  Question No:</span> {index + 1}/{data.allQuestion.length}</h1>
              </div>
            </div>
           </div>


          <div className='border-1 m-1 p-1 mt-4 '>
            <div>
              <label>Question</label><br />
              <input required type='text'
                className='w-[100%] border focus:outline-none'
                value={question}
                placeholder='Enter Option1 here'
                onChange={(e) => { setQuestion(e.target.value) }} />
            </div>

            <div>
              <label>Option1</label><br />
              <input required type='text'
                className='w-[100%] border focus:outline-none'
                value={option1}
                placeholder='Enter Option1 here'
                onChange={(e) => { setOption1(e.target.value) }} />
            </div>
            <div>
              <label>Option2</label><br />
              <input required type='text'
                className='w-[100%] border focus:outline-none'
                value={option2}
                placeholder='Enter Option2 here'
                onChange={(e) => { setOption2(e.target.value) }} />
            </div>
            <div>
              <label>Option3</label><br />
              <input required type='text'
                className='w-[100%] border focus:outline-none'
                value={option3}
                placeholder='Enter Option3 here'
                onChange={(e) => { setOption3(e.target.value) }} />
            </div>
            <div>
              <label>Option4</label><br />
              <input required type='text'
                className='w-[100%] border focus:outline-none'
                value={option4}
                placeholder='Enter Option4 here'
                onChange={(e) => { setOption4(e.target.value) }} />
            </div>
            <div>
              <label className='font-semibold'>Answer</label><br />
              <select value={answer}
                onChange={(e) => { setAnswer(e.target.value) }}
                className='border text-md w-28'


              >
                <option value={0}>option 1</option>
                <option value={1}>option 2</option>
                <option value={2}>option 3</option>
                <option value={3}>option 4</option>


              </select>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <button
              className={`text-xl  bg-green-600 ml-1 pl-4 pr-4 mt-2 text-white rounded`}
              onClick={() => { handleAddQuestions() }}
            >Add</button>
            <form onSubmit={handleSubmit}>
              <button
                type='submit'
                className=
                {`text-xl  mr-1 pl-4 pr-4 mt-2 text-white rounded bg-orange-600 `}>
                submit</button>
            </form>
          </div>



        </div>

      </div>
    </div>
  )
}

export default AddQuiz
