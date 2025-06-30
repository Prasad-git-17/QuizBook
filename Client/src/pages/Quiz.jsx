import React, { useState, useEffect } from 'react'
import { FaArrowCircleDown } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addMasterAns, addMasterData ,addTotalScore} from '../redux/QueSlice'
const apiUrl = import.meta.env.VITE_API_URL
const Quiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [test, setTest] = useState([])
  const [title, setTitle] = useState('...loading')
  const [score, setScore] = useState(0)
  const [color, setColor] = useState(4)
  const dispatch = useDispatch()
  
  const [queIndex, setQueIndex] = useState(() => {
    const check = localStorage.getItem('ind')
    return check && check !== 'undefined' ? JSON.parse(check) : 0
  })
  useEffect(() => {
    localStorage.setItem('ind', JSON.stringify(queIndex))
  }, [queIndex])

  const ansData = {
    ans: new Array(2).fill(null),

  }


  const [ansSet, setAnsSet] = useState(() => {
    const saved = localStorage.getItem('scoreSet')
    return saved && saved !== 'undefined' ? JSON.parse(saved) : ansData;
  }
  )

  useEffect(() => {
    localStorage.setItem('scoreSet', JSON.stringify(ansSet))
  }, [ansSet])


  useEffect(() => {

    const getTest = async () => {
      try {
        const testData = await axios.get(`${apiUrl}/api/v1/getTestByTestId/${id}`, {
          withCredentials: true
        })
        // console.log(testData.data)
        // console.log(testData.data.success)
        if (testData.data.success) {
          setTest(testData.data.questionById[0].allQuestion)
          setTitle(testData.data.questionById[0].title)
          dispatch(addMasterData(testData.data.questionById[0]))

        } else {
          navigate('/login')
        }


      } catch (error) {
        console.log('error happns to acsses quiz/test', error);

      }
    }

    getTest()
  }, [id])

  const handleIndex = () => {

    if (queIndex < test.length - 1) {
      setQueIndex(queIndex + 1)
      setColor(4)

    } else {
      alert('this is last question')
    }

  }



  const evluateAns = (a) => {


    let clickdAns = test[queIndex]?.answer

    //console.log(ansSet.ans);
   // dispatch(addMasterAns(ansSet.ans))
    setColor(a)
    setAnsSet((prev) => {
      const setter = [...ansSet.ans]
      setter[queIndex] = a
      return {
        ...prev,
        ans: setter
      }
    })




  }

  const handleSubmitQuiz = () => {
    // console.log(test);
    // console.log(ansSet.ans);
    dispatch(addMasterAns(ansSet.ans))
    setColor(4)
    let total = 0
    for (let i = 0; i < test.length; i++) {
      if (test[i].answer == ansSet.ans[i]) {
        total += 1
      }

      setScore(total)
      dispatch(addTotalScore(total))
      setAnsSet({ ans: new Array(2).fill(null) })
      localStorage.removeItem('scoreSet')
      setQueIndex(0)
      localStorage.removeItem('ind')
    }
    navigate('/score')
    console.log('your quiz score is', total);
  }


  const handleNavigation=(index)=>{
     setQueIndex(index)
     setColor(5)
     console.log(color);
     
  }

  return (
    <div className='min-h-screen' >

      <div className=' m-4 border items-center'>
        <div className='flex justify-between border-b-1'>
          <div className=' flex justify-satrt items-center  pt-1 pb-1  flex-wrap'>
            <h1 className='ml-1 mt-2 pl-1 pr-1 text-xl font-bold '>{title}</h1>
          </div>
          <button className='m-3  text-2xl p-1 rounded md:hidden'
            onClick={() => { setOpen(!open) }}><FaArrowCircleDown /></button>
        </div>
        <div className={`${open ? 'block' : 'hidden'} md:hidden border m-2 md:col-span-2 `}>
          {test.map((data, index) => {
            return <button key={index}
              className={`${queIndex == index ? 'bg-green-700 text-white font-bold' : ''}
               border  m-1 w-8 p-1 text-md rounded`}
              onClick={() => { handleNavigation(index) }}
            >{index + 1}</button>

          })}

        </div>
        <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-5 gap-2 m-2 '>
          <div className='border md:col-span-3 row-span-3'>
            <div className='m-2'>

              <h1 className='mt-4'>
                Que {queIndex + 1} : {test[queIndex]?.question || 'loading......'}
              </h1>
              <div className='mb-4 mt-3'>
                <button
                  className={`${color == '0' ? 'bg-blue-400 text-white font-bold' : ''} 
                w-[50%] ml-1 mt-2 border pl-1 pr-1 rounded`}
                  onClick={() => { evluateAns(0) }}>{test[queIndex]?.options[0] || 'loading...'}
                </button><br />
                <button
                  className={`${color == '1' ? 'bg-blue-400 text-white font-bold' : ''} 
                w-[50%] ml-1 mt-2 border pl-1 pr-1 rounded`}
                  onClick={() => { evluateAns(1) }}>{test[queIndex]?.options[1] || 'loading...'}
                </button><br />
                <button
                  className={`${color == '2' ? 'bg-blue-400 text-white font-bold' : ''}
                  w-[50%] ml-1 mt-2 border pl-1 pr-1 rounded`}
                  onClick={() => { evluateAns(2) }}>{test[queIndex]?.options[2] || 'loading...'}
                </button><br />
                <button
                  className={`${color == '3' ? 'bg-blue-400 text-white font-bold' : ''}
                 w-[50%] ml-1 mt-2 border pl-1 pr-1 rounded`}
                  onClick={() => { evluateAns(3) }}>{test[queIndex]?.options[3] || 'loading...'}
                </button><br />
              </div>


            </div>

          </div>
          <div className={`hidden md:block border md:col-span-2 `}>
            {test.map((data, index) => {
              return <button key={index} className={`${queIndex == index ? 'bg-blue-400 text-white font-bold' : ''} border  m-1 w-8 p-1 text-md rounded`}
                onClick={() => { handleNavigation(index)}}
              >{index + 1}</button>

            })}

          </div>
        </div>
        <div className='mt-3 mb-3 flex justify-between m-2'>
          <button className={`${queIndex == test.length - 1 ? 'hidden' : 'block'} ml-1 mt-2 bg-gray-700 text-white pl-1 pr-1 rounded `} onClick={() => { handleIndex() }}>Save & Next</button>
          <button className='ml-1 mt-2  bg-green-700 text-white pl-3 pr-3 rounded' onClick={() => { handleSubmitQuiz() }}>submit</button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
