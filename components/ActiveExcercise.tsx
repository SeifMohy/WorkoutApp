import React, { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import Checkbox from '@mui/material/Checkbox'
import { Exercise } from '@prisma/client'
import Video from './Video'

type props = {
  exercise:Exercise
}

function ActiveExcercise({exercise}: props){

  return (
    <Fragment>

      <h2 className='font-extrabold text-[1.5rem] mt-[1rem] mb-[2rem]'>{exercise?.name}</h2>
      <iframe src={exercise?.videoUrl} title={exercise?.name} allow='autoPlay'className='w-full min-h-[20rem]'/>
      {/* <Video/> */}
      <p className='mb-[1rem] flex min-w-[22rem] max-w-[50rem] my-[2rem]'>{exercise?.description}</p>
    </Fragment>
  )
}

export default ActiveExcercise

