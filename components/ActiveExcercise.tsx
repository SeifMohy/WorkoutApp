import React, { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useFormik } from 'formik'
import Checkbox from '@mui/material/Checkbox'
import { Exercise } from '@prisma/client'
import Video from './Video'

type props = {
  exercise:Exercise
}

// {
//   "weight":1,
//   "reps":3,
//   "workoutLineId":1,

// }

// /api/user/log
// post method

function ActiveExcercise({exercise}:props) {
  const videoContainer =
    'relative w-full h-[27rem] rounded-2xl mb-[0.75rem] rounded-2xl border'
  const caption =
    'transition duration-150 ease-out hover:ease-in my-4 text-gray-600'
  const card =
    'flex-col justify-center border transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white duration-300'
  const cardTextContainer = ''
  const workoutName = 'font-bold'
  const workoutPic = 'w-full object-fill'
  // className={videoContainer}


  // const formData = (url) => axios.put(url).then((res) => res.data)
  // const {data:logUpdate, error} = useSWR('/api/user/log', formData)




  return (
    <Fragment>

      <h2 className='font-extrabold text-[1.5rem] mt-[1rem] mb-[2rem]'>{exercise?.exercise.name}</h2>
      <iframe src={exercise?.exercise.videoUrl} title={exercise?.exercise.name} allow='autoPlay'className='w-full min-h-[20rem]'/>
      {/* <Video/> */}
      <p className='mb-[1rem] flex min-w-[22rem] max-w-[50rem] my-[2rem]'>{exercise?.exercise.description}</p>
    </Fragment>
  )
}

export default ActiveExcercise

