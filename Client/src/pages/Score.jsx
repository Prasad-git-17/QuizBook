import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
 import { addMasterAns,addMasterData } from '../redux/QueSlice'
const Score = () => {
     
     const dispatch = useDispatch()
     const ansData=useSelector((state)=>state.Quiz.MasterAns)
     const queData=useSelector((state)=>state.Quiz.MasterData)
     const totalScore=useSelector((state)=>state.Quiz.totalScore)
     console.clear()
     console.log(ansData);
     console.log(queData);
     console.log(queData.allQuestion);
     
     
     
  return (
    <div className='m-4'>
      <h1 className='text-center text-2xl font-bold '>Score Analysis</h1>
      <h1 className=' text-xl font-bold '>Title : {queData.title}</h1>
      <div className=' p-1 border mt-2 mb-2'>
        <h1 className=' font-semibold text-lg  text-green-600'>Score : {totalScore}</h1>
        <h1 className=' font-semibold text-lg '>Total Questions : {queData.allQuestion.length}</h1>
        <h1 className=' font-semibold text-lg ' >Percentage : {`${totalScore/queData.allQuestion.length*100} %`}</h1>
      </div>
      <h1 className='font-semibold text-lg mb-4'> All questions</h1>
      <div className=' p-3 border-1 mt-2 '>
        {queData.allQuestion.map((data,index)=>{
            return <div key={index} className='mb-2 border-b-1'>
          <h1>Que {index +1} : {data.question}</h1>
          <ul>
            <li>{`1) ${data.options[0]}`}</li>
            <li>{`2) ${data.options[1]}`}</li>
            <li>{`3) ${data.options[2]}`}</li>
            <li>{`4) ${data.options[3]}`}</li>
          </ul>
          <h1>Answer : {data.options[data.answer]}</h1>
          <h1>Your Answer : {data.options[ansData[index]] || 'not attempted'}</h1>
        </div>
        })}
    
      </div>
    </div>
  )
}

export default Score
