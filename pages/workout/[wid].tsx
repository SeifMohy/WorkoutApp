import React, { Fragment } from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import ActiveExcercise from "components/ActiveExcercise";
import { CircularProgress } from "@mui/material";
import { Exercise, WorkoutLine } from "@prisma/client";
import Layout from "components/layout";
import { useWorkout } from "context/WorkoutProvider";

const Workout:React.FC = () => {

  const router = useRouter();
  const { wid } = router.query;
  const { daysWorkout, setWorkoutForTheDay } = useWorkout();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR('/api/workout/' + wid, fetcher);

  const startWorkout = () => {
    setWorkoutForTheDay(wid!.toString());
    router.push('/');
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col justify-start min-h-screen bg-gray-100 align-center">
        <div className="relative w-full h-[20rem] mb-[0.75rem] bg-black">
          <Image
            src={data.workout.imgUrl}
            alt={data.workout.name}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="absolute flex-col justify-start items-start pt-[5.5rem]">
          <h1 className="mt-[1.5rem] lg:mt-[3rem] mb-[0.5rem] self-start p-[1rem] text-[3rem] font-bold text-left text-gray-100">
            {data.workout.name}
          </h1>
          <h2 className="ml-[1rem] w-[95%] text-gray-100 text-[1.2rem]">
            {data.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Doloremque, aliquam placeat officiis odit.
          </h2>
        </div>
        {data.workout.length == 0 ? (
          <h1>no exercise</h1>
        ) : (
          <ul className="flex flex-col items-center justify-center">
            {data.workout.exercises.map(
              (
                exercise: WorkoutLine & {
                  exercise: Exercise;
                }
              ) => {
                return (
                  <li
                    key={exercise.exercise.id}
                    className="flex-col justify-center border transition ease-in-out delay-150 p-[1rem] rounded-2xl my-[2rem] w-[90%] hover:-translate-y-1 hover:bg-white duration-300"
                  >
                    <Fragment>
                      <h2 className="font-extrabold text-[1.5rem] mt-[1rem] mb-[2rem]">
                        {exercise.exercise.name}
                      </h2>
                      <iframe
                        src={exercise.exercise.videoUrl}
                        title={exercise.exercise.name}
                        allow="autoPlay"
                        className="w-full min-h-[20rem]"
                      />
                      <p className="mb-[1rem] flex min-w-3/5 max-w-4/5 my-[2rem]">
                        {exercise.exercise.description}
                      </p>
                    </Fragment>
                  </li>
                );
              }
            )}
          </ul>
        )}

        <button
          className="self-center mx-[0.5rem] mt-[1.7rem] mb-[2.5rem] bg-black text-white border rounded-2xl p-[0.6rem] transition ease-in-out delay-150 hover:bg-gray-700 font-bold text-[1.5rem]	 md:w-4/5 sm:max-w-sm hover:scale-105 duration-300 ..."
          onClick={startWorkout}
        >
          start the workout
        </button>
      </div>
    </Layout>
  );
}

export default Workout