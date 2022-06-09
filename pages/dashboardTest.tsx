import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import {
  ProgressAPIResponseType,
  todaysWorkoutData,
  WorkoutInfo,
  WorkoutLineData,
} from "types";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useWorkout, WorkoutContext } from "components/WorkoutProvider";
import DashboardHeadTab from "components/DashboardHeadTab";
import ExerciseIndex from "components/ExerciseIndex";
import ExerciseInput from "components/ExerciseInput";

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

  if (!logsByExercise || !workout || !workoutInfo || !userStreak) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  } else {
  }
  return (
    <Layout>
      <div className="min-h-screen p-5 bg-gray-100">
        {/* welcome div */}
        <DashboardHeadTab userStreak={userStreak} />
        {/* TODO: fix error */}
        {/* Personal Records */}

        <div className="flex">
          <p className="my-3 text-lg">&#127942;</p>
          <div className="mx-1 my-3 text-lg">
            Personal Records TODO msg: no personal records..
          </div>
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
                  className="flex-col items-center p-2 mb-1"
                >
                  <ExerciseIndex workout={workout} />
                  <div className="flex w-4/5 border-l-4 ml-[2rem] pl-[2.5rem]  md:w-[90%]">
                    <div className="flex-col justify-end w-full bg-white">
                      <div className="flex justify-start p-3 bg-gray-200 border">
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem]">
                          Set
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2">
                          Weight
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2 ml-[1.7rem] lg:ml-[5.7rem]">
                          Reps
                        </div>
                      </div>
                      {Array.from(Array(workout.recSets)).map(
                        (_, exerciseSetIndex) => (
                          <div className="mx-[0.5rem] py-[0.5rem] border-b-4" key={exerciseSetIndex}>
                          <div
                            
                            className="flex justify-start pb-3"
                          >
                            <div className="m-3 w-[3rem]">
                              {exerciseSetIndex + 1}
                            </div>
                            
                              <input
                                name={`workoutLogs[${workoutIndex}].weight[${exerciseSetIndex}]`}
                                placeholder={`${workout.recWeight}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] mx-[1rem] md:w-[12rem] lg:w-[19rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-gray-600 relative block  rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-100"
                              ></input> 

                              <input
                                name={`workoutLogs[${workoutIndex}].reps[${exerciseSetIndex}]`}
                                placeholder={`${workout.recReps}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] mx-[1rem] md:w-[12rem] lg:w-[19rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 relative block rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300" 
                              ></input> 
                            </div>
                          </div> //TODO: make check button work and filter if not checked
                        )
                      )}
                    </div> 

                  </div>
                  <ExerciseInput workout={workout} workoutIndex={workoutIndex} todaysWorkout={todaysWorkout}/>
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
      {/* //-------------------------------- */}
      {/* <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">
            Card Details
          </legend>
          <div className="mt-1 -space-y-px bg-white rounded-md shadow-sm">
            <div>
              <label htmlFor="card-number" className="sr-only">
                Card number
              </label>
              <input
                type="text"
                name="card-number"
                id="card-number"
                className="relative block w-full bg-transparent border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-t-md focus:z-10 sm:text-sm"
                placeholder="Card number"
              />
            </div>
            <div className="flex -space-x-px">
              <div className="flex-1 w-1/2 min-w-0">
                <label htmlFor="card-expiration-date" className="sr-only">
                  Expiration date
                </label>
                <input
                  type="text"
                  name="card-expiration-date"
                  id="card-expiration-date"
                  className="relative block w-full bg-transparent border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-bl-md focus:z-10 sm:text-sm"
                  placeholder="MM / YY"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="card-cvc" className="sr-only">
                  CVC
                </label>
                <input
                  type="text"
                  name="card-cvc"
                  id="card-cvc"
                  className="relative block w-full bg-transparent border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-br-md focus:z-10 sm:text-sm"
                  placeholder="CVC"
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="mt-6 bg-white">
          <legend className="block text-sm font-medium text-gray-700">
            Billing address
          </legend>
          <div className="mt-1 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="relative block w-full bg-transparent border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-t-md focus:z-10 sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
            <div>
              <label htmlFor="postal-code" className="sr-only">
                ZIP / Postal code
              </label>
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="relative block w-full bg-transparent border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-b-md focus:z-10 sm:text-sm"
                placeholder="ZIP / Postal code"
              />
            </div>
          </div>
        </fieldset>
      </div> */}
      {/* //---------------------------------------------------------------- */}
    </Layout>
  );
};

export default Dashboard;

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
