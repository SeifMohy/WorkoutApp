import React, { useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { useSession } from 'next-auth/react'
import ActiveExcercise from 'components/ActiveExcercise'
import { CircularProgress } from '@mui/material';
import { Exercise } from '@prisma/client'

export default function Workout() {
  const imageContainer =
    'relative w-80 h-[27rem] rounded-2xl mb-[0.75rem] rounded-2xl'
  const caption =
    'transition duration-150 ease-out hover:ease-in my-4 text-gray-600'
  const card =
    'flex-col justify-center border transition ease-in-out delay-150 p-[1rem] rounded-2xl my-[1rem] hover:-translate-y-1 hover:bg-white duration-300'
  const browserWrapper = 'flex flex-col justify-center align-center p-[1rem]'
  const cardTextContainer = ''
  const workoutName = 'font-bold'
  const workoutPic = 'relative w-80 h-[27rem] rounded-2xl mb-[0.75rem] rounded-2xl border'


  const router = useRouter()
  const { wid } = router.query

// const { data: session } = useSession()

// const userEmail = session.user.email
// const payload = { userEmail }

  const fetcher = (url: any) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWR('/api/workout/' + wid, fetcher)
  console.log({data})
  



  if(!data) {

    return (
        <div className='flex justify-center items-center w-full h-[100vh]'>
            <CircularProgress color="inherit" className='w-[12rem]'/>
      </div> 
    )  
  }

  return (
    
    <div className={browserWrapper}>
      <div className='flex flex-row p-[1rem] rounded-2xl bg-white border'>
        <div className='relative w-[12rem] h-[17rem] md:w-[20rem] md:h-[35rem] rounded-2xl mb-[0.75rem] rounded-2xl'>
          <Image
            src={data.imgUrl}
            alt={data.name}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className='flex flex-col items-start justify-start'>
          <h1 className="mt-[3rem] mb-[0.5rem] self-center p-[1rem] text-center text-[1.5rem] md:text-[3rem] font-extrabold">
            {data.name}
          </h1>
          <h2>{data.description}</h2> 
        </div>
      </div>
      {data.exercises.length == 0 ? (
        <h1>no exercise</h1>
      ) : (
        <ul className="flex flex-col items-center justify-center">
          {data?.exercises?.map((exercise: Exercise) => (
            <li key={exercise.id} className={card}>
              <ActiveExcercise exercise={exercise}/>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
