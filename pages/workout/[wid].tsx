import React, { useEffect, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { useSession } from 'next-auth/react'
import ActiveExcercise from "components/ActiveExcercise";
import { CircularProgress } from "@mui/material";
import { Exercise } from "@prisma/client";
import Layout from "components/layout";
import { useWorkout, WorkoutContext } from "components/WorkoutProvider";

export default function Workout() {

  const router = useRouter();
  const { wid } = router.query;
  const { daysWorkout, setWorkoutForTheDay } = useWorkout();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/workout/" + wid, fetcher);
  
  const startWorkout = () => {
    setWorkoutForTheDay(wid!.toString());
    router.push("/dashboard");
  };


  console.log(daysWorkout);
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
            src={data.imgUrl}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="absolute flex-col justify-start items-start pt-[5.5rem]">
          <h1 className="mt-[1.5rem] lg:mt-[3rem] mb-[0.5rem] self-start p-[1rem] text-[3rem] font-bold text-left text-gray-100">
            {data.name}
          </h1>
          <h2 className="ml-[1rem] w-full text-gray-100 text-[1.2rem]">
            {data.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Doloremque, aliquam placeat officiis odit.
          </h2>

        </div>
        {data.exercises.length == 0 ? (
          <h1>no exercise</h1>
        ) : (
          <ul className="flex flex-col items-center justify-center">
            {data?.exercises?.map((exercise: Exercise) => (
              <li key={exercise.id} className="flex-col justify-center border transition ease-in-out delay-150 p-[1rem] rounded-2xl my-[2rem] hover:-translate-y-1 hover:bg-white duration-300">
                <ActiveExcercise exercise={exercise} />
              </li>
            ))}
          </ul>
        )}

        <button
          className="self-center mx-[0.5rem] mt-[1.7rem] mb-[2.5rem] bg-black text-white border rounded-2xl p-[0.6rem] transition ease-in-out delay-150 hover:bg-gray-700 font-bold text-[1.5rem] w-4/5 lg:w-3/5 hover:scale-105 duration-300 ..."
          onClick={startWorkout}
        >
          start the workout
        </button>

      </div>
    </Layout>
  );
}
