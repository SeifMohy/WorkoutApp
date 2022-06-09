import { Exercise } from '@prisma/client'
import React, { Fragment, useEffect, useState } from 'react'
import { WorkoutInfo } from 'types/index'

type props = {
  exercise:Exercise[]
}

const ActiveExcercise:React.FC<props> = ({exercise}) => {

  return (
    <Fragment>

      <h2 className='font-extrabold text-[1.5rem] mt-[1rem] mb-[2rem]'>{exercise.name}</h2>
      <iframe src={exercise.videoUrl} title={exercise.name} allow='autoPlay'className='w-full min-h-[20rem]'/>
      <p className='mb-[1rem] flex min-w-3/5 max-w-4/5 my-[2rem]'>{exercise.description}</p>

    </Fragment>
  )
}

export default ActiveExcercise

