import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import { Workout } from "@prisma/client";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

import { useRouter } from "next/router";

const fetchWorkouts = (url: string) => axios.get(url).then((res) => res.data);

const BrowseWorkouts = () => {
  const router = useRouter();

  const { data, error } = useSWR(`/api/workouts`, fetchWorkouts);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-screen p-5 pt-8 bg-gray-100 align-center">
        <h1 className="text-2xl font-extrabold text-center">
          Browse our carefully curated workouts
        </h1>
        <p className="m-2 font-light text-center text-md">
          Thoughtfully designed workouts meant to push you to the absolute
          limits
        </p>
        <ul className="grid self-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-rows">
          {data.data.map((workout: Workout) => (
            <li
              onClick={() => router.push(`/workout/${workout.id}`)}
              key={workout.id}
              className="flex-col cursor-pointer justify-center border transition ease-in-out delay-150 p-[1rem] rounded-2xl my-[1rem] hover:-translate-y-1 hover:bg-white duration-300"
            >
              <div className="relative cursor-pointer w-40 h-40 mb-[0.75rem] rounded-2xl">
                <Image
                  src={workout.imgUrl}
                  alt={workout.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-fill w-full"
                />
              </div>
              <div className="">
                <h3 className="font-bold">{workout.name}</h3>
                {/* <Link href={`/workout/${workout.id}`}>
                  <a className="my-4 text-gray-600 transition duration-150 ease-out hover:ease-in">
                    get it started
                  </a>
                </Link> */}
                <p className="my-4 text-gray-600 transition duration-150 ease-out hover:ease-in">
                  get it started
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default BrowseWorkouts;
