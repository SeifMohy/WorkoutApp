import Layout from '../components/layout';
import axios from 'axios';
import useSWR from 'swr';
import {
  ProgressAPIResponseType,
  todaysWorkoutData,
  WorkoutInfo,
  WorkoutLineData
} from '../types/index';
import { useFormik } from 'formik';
import { CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardHeadTab from '../components/DashboardHeadTab';
import ExerciseIndex from '../components/ExerciseIndex';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hook';
import { workoutState } from '../slices/workout.slice';

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
  const router = useRouter();
  const state = useAppSelector(workoutState);
  const todaysWorkoutId = state.daysWorkout; //TODO: have something that determines which workout is todays workout

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

  if (!logsByExercise || !workout || !workoutInfo) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-5 bg-gray-100">
        <DashboardHeadTab userStreak={userStreak!} />

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
          {` Today's`} Workout ({workoutInfo.workout.name} Workout)
        </div>
        <div>
          <>
            {todaysWorkout?.map((workout, workoutIndex) => {
              return (
                <div
                  key={workoutIndex}
                  className="flex-col items-center p-2 mb-1"
                >
                  <ExerciseIndex workout={workout} />
                  <div className="flex w-4/5 border-l-4 ml-[2.1rem] pl-[2.5rem]  md:w-[90%]">
                    <div className="flex-col justify-end w-full bg-white rounded-xl">
                      <div className="flex justify-around p-3 bg-gray-200 rounded-t-xl">
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem]">
                          Set
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] px-2">
                          Weight
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem]  px-2 ml-[1.7rem] lg:ml-[5.7rem]">
                          Reps
                        </div>
                      </div>
                      {Array.from(Array(workout.recSets)).map(
                        (_, exerciseSetIndex) => (
                          <div
                            className="py-[0.2rem] border-t-2 max-h-[6rem]"
                            key={exerciseSetIndex}
                          >
                            <div className="flex justify-around px-3">
                              <div className="m-3 w-[3rem] lg:ml-[3rem]">
                                {exerciseSetIndex + 1}
                              </div>

                              <input
                                name={`workoutLogs[${workoutIndex}].weight[${exerciseSetIndex}]`}
                                placeholder={`${workout.recWeight}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] ml-[2rem] md:w-[8rem] lg:w-[12rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-gray-600 relative block  rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-100"
                              ></input>

                              <input
                                name={`workoutLogs[${workoutIndex}].reps[${exerciseSetIndex}]`}
                                placeholder={`${workout.recReps}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] ml-[2rem] pl-[0.5rem] md:w-[8rem] lg:w-[12rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 relative block rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                              ></input>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
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
