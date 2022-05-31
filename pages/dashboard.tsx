import React from 'react';
import Layout from '../components/layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import { ProgressAPIResponseType, todaysWorkoutData, WorkoutLineData } from 'types';
import workouts from './api/workouts';
import { WorkoutLine } from '@prisma/client';

function choosingColor(name: string) {
  switch (name) {
    case 'Squat':
      return 'bg-red-700';
    case 'Lunges':
      return 'bg-green-700';
    case 'Jumping Jacks':
      return 'bg-blue-700';
    default:
      return 'bg-red-700';
  }
}
const userId = '1'; //TODO: Get user from session data
const todaysWorkoutId = "1"; //TODO: have something that determines which workout is todays workout
const fetchExercisesById = (url: string) =>
  axios.get(url).then((res) => res.data);

const fetchWorkout = (url: string) =>
  axios.get(url).then((res) => res.data);

const dashboard = () => {
  const { data: logsByExercise, error: logsByExerciseError } =
    useSWR<ProgressAPIResponseType>(
      `/api/progress/${userId}`,
      fetchExercisesById
    );
    const { data: workout, error: workoutError } =
    useSWR<WorkoutLineData>(
      `/api/workoutLines/${todaysWorkoutId}`,
      fetchWorkout
    );
  const session = useSession();

  //console.log(logsByExercise);
  

  if (!logsByExercise || !workout) {
    return <div>loading...</div>;
  }
  console.log(Object.values(workout?.data)[0])
  const todaysWorkout : todaysWorkoutData[] = Object.values(workout?.data)[0]
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5 pt-8">
        {/* welcome div */}
        <div className="bg-white md:flex justify-between content-center m-3">
          <div className="flex items-stretch">
            <img
              className="w-14 h-14 rounded-full m-2"
              src={session?.data?.user?.image || '/icon.png'}
              alt="Rounded avatar"
            />
            <div className="self-center">
              <div className="text-xl font-bold">
                Good Morning, {session?.data?.user?.name?.replace(/[0-9]/g, '')}
              </div>
              {/* TODO: Fire Emoji */}
              <div className="text-xs font-light text-gray-600">
                10 Day Streak
              </div>
              {/* TODO: Endpoint for streaks */}
            </div>
          </div>
          <div className="flex m-3 justify-between">
            {/* TODO: add white below buttons on small screen */}
            <button className="md:mx-4 px-2 text-sm border border-gray-600 rounded-md h-10 self-center">
              Browse Workouts
            </button>
            <button className="px-2 text-sm rounded-md text-white bg-black h-10 self-center">
              Start Todays Workout
            </button>
          </div>
        </div>
        {/* Personal Records */}
        <div className="text-lg m-3">Personal Records</div>
        <div className="">
          <div className="lg:grid lg:grid-cols-3 lg:gap-5 grid justify-items-stretch">
          <>
            {logsByExercise.map((exercise) => {
              return (
                <div key={exercise.name} className={`${choosingColor(exercise.name)} rounded-md p-5 w-3/4 lg:w-full my-3 justify-self-center`}>
                  <div className="text-white text-base">{exercise.name}</div>
                  <div className="text-white text-sm">{exercise.max} KG</div>
                </div>
              );
            })}
            </>
          </div>
        </div>
        <div className="text-lg m-3">Today's Workout (Workout Name)</div>
        <div>
          <div className="grid grid-cols-2 divide-y-2">
            <div className="text-center">Weight</div>
            <div className="text-center">Reps</div>
            </div>
            <>
            {todaysWorkout.map((workout)=>{
              return(
                <div className="flex items-stretch">
                <img
                  className="w-14 h-14 rounded-full m-2"
                  src={workout.excercise.videoUrl} //TODO: Add a picture
                  alt="Rounded avatar"
                />
                <div className="self-center">
                  <div className="text-xl font-bold">
                  {workout.excercise.name}
                  </div>
                  {/* TODO: Fire Emoji */}
                  <div className="text-xs font-light text-gray-600">
                    {workout.recSets} Sets x {workout.recReps} Reps
                  </div>
                  {/* TODO: Endpoint for streaks */}
                </div>
              </div>
              )
            })}
            </>
        </div>
      </div>
    </Layout>
  );
};

export default dashboard;
