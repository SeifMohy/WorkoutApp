import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import {
  ProgressAPIResponseType,
  todaysWorkoutData,
  WorkoutInfo,
  WorkoutLineData
} from 'types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { useWorkout, WorkoutContext } from 'components/WorkoutProvider';
import DashboardHeadTab from 'components/DashboardHeadTab';

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
type WorkoutLine = {
  weight: any[];
  reps: any[];
  workoutLineId: String;
  userId: String;
};

export type StreakInfo = {
  userStreak: number;
};

const fetchUserStreak = (url: string) => axios.get(url).then((res) => res.data);

const fetchExercisesById = (url: string) =>
  axios.get(url).then((res) => res.data);

const fetchWorkout = (url: string) => axios.get(url).then((res) => res.data);

const fetchWorkoutName = (url: string) =>
  axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const session = useSession();
  const { daysWorkout } = useWorkout();
  const todaysWorkoutId = daysWorkout; //TODO: have something that determines which workout is todays workout
  const userEmail = session.data?.user?.email;

  const { data: logsByExercise, error: logsByExerciseError } =
    useSWR<ProgressAPIResponseType>(`/api/progress`, fetchExercisesById);

  const { data: workout, error: workoutError } = useSWR<WorkoutLineData>(
    `/api/workoutLines/${todaysWorkoutId}`,
    fetchWorkout
  );

  const { data: workoutInfo, error: workoutInfoError } = useSWR<WorkoutInfo>(
    `/api/workout/${todaysWorkoutId}`,
    fetchWorkoutName
  );

  const { data: userStreak, error: userStreakError } = useSWR<StreakInfo>(
    `/api/streak`,
    fetchUserStreak
  );

  console.log(logsByExercise);
  console.log(workout);
  console.log(workoutInfo);
  console.log(userStreak);

  const todaysWorkout: todaysWorkoutData[] = Object.values(
    workout?.data || []
  )[0];

  const initialValues = {
    workoutLogs: todaysWorkout?.map((workoutLine) => {
      return {
        weight: Array.from(Array(workoutLine.recSets)),
        reps: Array.from(Array(workoutLine.recSets)),
        workoutLineId: workoutLine.id
      };
    })
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values: any, resetForm: any) => {
      // formik.resetForm();
      console.log(values);
      const res = await axios.put('/api/userLogs/test', values); //This is on userLogs/test to avoid session errors
      console.log('userLogs', res);
    }
  });
  // console.log(logsByExercise);


  if (!logsByExercise || !workout || !workoutInfo) {

    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  }else{}
  return (
    <Layout>
      <div className="min-h-screen p-5 bg-gray-100">
        {/* welcome div */}
        <DashboardHeadTab userStreak={userStreak || 0? userStreak : 0} /> 
        {/* TODO: fix error */}
        {/* Personal Records */}

        <div className="flex">
          <p className="my-3 text-lg">&#127942;</p>
          <div className="mx-1 my-3 text-lg">Personal Records</div>
        </div>

        <div className="">
          <div className="grid lg:grid lg:grid-cols-3 lg:gap-5 justify-items-stretch">
            <>
              {logsByExercise.map((exercise) => {
                return (
                  <div
                    key={exercise.name}
                    className={`${choosingColor(
                      exercise.name
                    )} rounded-md p-5 w-3/4 lg:w-full my-3 justify-self-center`}
                  >
                    <div className="text-base text-white">{exercise.name}</div>
                    <div className="text-sm text-white">{exercise.max} KG</div>
                  </div>
                );
              })}
            </>
          </div>
        </div>
        <div id="workoutTitle" className="m-3 text-lg">
          {` Today's`} Workout ({workoutInfo.name} Workout)
        </div>
        <div>
          <>
            {todaysWorkout.map((workout, workoutIndex) => {
              return (
                <div
                  key={workoutIndex}
                  className="flex-col items-start p-2 mb-1 transition duration-300 ease-in-out delay-150 bg-white rounded-2xl hover:bg-gray-200"
                >
                  <div className="flex items-stretch">
                    <img
                      className="m-2 rounded-full w-14 h-14"
                      src={workout.exercise.imageUrl}
                      alt="Rounded avatar"
                    />
                    <div className="self-center">
                      <div className="text-xl font-bold">
                        {workout.exercise.name}
                      </div>
                      <div className="text-xs font-light text-gray-600">
                        {workout.recSets} Sets x {workout.recReps} Reps
                      </div>
                      {/* TODO: Endpoint for streaks */}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-13">
                    <div className="px-2 border">
                      <span className="text-center">#</span>
                    </div>
                    <div className="px-2 border">
                      <span className="text-center">Weight</span>
                    </div>
                    <div className="px-2 border">
                      <span className="text-center">Reps</span>
                    </div>
                  </div>

                  {Array.from(Array(workout.recSets)).map(
                    (_, exerciseSetIndex) => (
                      <div
                        key={exerciseSetIndex}
                        className="flex justify-around pb-3"
                      >
                        <div className="text-center">
                          {exerciseSetIndex + 1}
                        </div>

                        <input
                          name={`workoutLogs[${workoutIndex}].weight[${exerciseSetIndex}]`}
                          placeholder={`${workout.recWeight}`}
                          onChange={formik.handleChange}
                          className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2"
                        ></input>
                        <input
                          name={`workoutLogs[${workoutIndex}].reps[${exerciseSetIndex}]`}
                          placeholder={`${workout.recReps}`}
                          onChange={formik.handleChange}
                          className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2"
                        ></input>
                      </div> //TODO: make check button work and filter if not checked
                    )
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              className="text-white  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Finish
            </button>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
