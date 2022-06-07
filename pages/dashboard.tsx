import React, { useContext, useEffect } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import axios from "axios";
import useSWR from "swr";
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


function choosingColor(name: string) {
  switch (name) {
    case "Squat":
      return "bg-red-700";
    case "Lunges":
      return "bg-green-700";
    case "Jumping Jacks":
      return "bg-blue-700";
    default:
      return "bg-red-700";
  }
}
type WorkoutLine = {
  weight: any[];
  reps: any[];
  workoutLineId: String;
  userId: String;
};

type StreakInfo = {
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
  console.log(userStreak);

  //console.log(workout);
  const todaysWorkout: todaysWorkoutData[] = Object.values(
    workout?.data || []
  )[0];

  const initialValues = {
    workoutLogs: todaysWorkout?.map((workoutLine) => {
      return {
        weight: Array.from(Array(workoutLine.recSets)),
        reps: Array.from(Array(workoutLine.recSets)),
        workoutLineId: workoutLine.id,
      };
    }),
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values: any, resetForm: any) => {

      // formik.resetForm();
      console.log(values)
      const res = await axios.put("/api/userLogs/test", values); //This is on userLogs/test to avoid session errors
      console.log("userLogs", res);
    },
  });
  // console.log(logsByExercise);

  if (
    !logsByExercise ||
    !workout ||
    !todaysWorkout ||
    !workoutInfo ||
    !userStreak
  ) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  }

  console.log({ logsByExercise });
  console.log({ daysWorkout });

  return (
    <Layout>
      <div className="min-h-screen p-5 pt-8 bg-gray-100">
        {/* welcome div */}
        <div className="content-center justify-between m-3 bg-white md:flex">
          <div className="flex items-stretch">
            <img
              className="w-14 h-14 rounded-full m-2"
              src={session?.data?.user?.image || "/icon.png"}
              alt="Rounded avatar"
            />
            <div className="self-center">
              <div className="text-xl font-bold">
                Good Morning, {session?.data?.user?.name?.replace(/[0-9]/g, "")}
              </div>
              <div className="flex">
                <p className="text-xs font-light mx-1">&#128293;</p>
                <div className="text-xs font-light text-gray-600">
                  {""} {`${userStreak}`} Day Streak
                </div>
              </div>
              {/* TODO: Endpoint for streaks */}
            </div>
          </div>
          <div className="flex justify-between m-3">
            {/* TODO: add white below buttons on small screen */}
            <Link href="/browseWorkouts" className="flex items-stretch">
              <a className="self-center p-2 px-2 text-sm border border-gray-600 rounded-md md:mx-4">
                Browse Workouts
              </a>
            </Link>
            <Link href="#workoutTitle">
              <a className="self-center p-2 px-2 text-sm text-white bg-black rounded-md">
                Start Todays Workout
              </a>
            </Link>
          </div>
        </div>
        {/* Personal Records */}

        <div className="flex">
          <p className="text-lg my-3">&#127942;</p>
          <div className="text-lg my-3 mx-1">Personal Records</div>
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
        <div id="workoutTitle" className="text-lg m-3">
          Today's Workout ({workoutInfo.name} Workout)
        </div>
        <div>
          <>
            {todaysWorkout.map((workout, workoutIndex) => {
              return (
                <div key={workoutIndex}>
                  <div className="flex items-stretch">
                    <img
                      className="w-14 h-14 rounded-full m-2"
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
                  <div className="grid grid-cols-3">
                    <div className="text-center">#</div>
                    <div className="text-center">Weight</div>
                    <div className="text-center">Reps</div>
                  </div>
                  {Array.from(Array(workout.recSets)).map(
                    (_, exerciseSetIndex) => (
                      <div
                        key={exerciseSetIndex}
                        className="grid grid-cols-3 gap-5"
                      >
                        <div className="text-center">
                          {exerciseSetIndex + 1}
                        </div>
                        <input
                          name={`workoutLogs[${workoutIndex}].weight[${exerciseSetIndex}]`}
                          placeholder={`${workout.recWeight}`}
                          onChange={formik.handleChange}
                        ></input>
                        <input
                          name={`workoutLogs[${workoutIndex}].reps[${exerciseSetIndex}]`}
                          placeholder={`${workout.recReps}`}
                          onChange={formik.handleChange}
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
              Submit
            </button>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

