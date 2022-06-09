import React, { Fragment} from 'react'

type props = {
  exercise:any
}

function ActiveExcercise({exercise}: props){

  return (
    <Fragment>

      <h2 className='font-extrabold text-[1.5rem] mt-[1rem] mb-[2rem]'>{exercise?.exercise.name}</h2>
      <iframe src={exercise?.exercise.videoUrl} title={exercise?.exercise.name} allow='autoPlay'className='w-full min-h-[20rem]'/>
      <p className='mb-[1rem] flex min-w-3/5 max-w-4/5 my-[2rem]'>{exercise?.exercise.description}</p>

    </Fragment>
  )
}

export default ActiveExcercise

