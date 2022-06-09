
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import CalenderComp from "../components/calendarComponent";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import { WorkoutHistoryCard } from "types";
import moment from "moment";
import exercise from "./api/exercise";

const fetchWorkoutHistory = (url: string) =>
  axios.get(url).then((res) => res.data);

const calendar = () => {
  const { data, error } = useSWR<WorkoutHistoryCard>(
    `/api/workoutHistory/workoutCardTest`,
    fetchWorkoutHistory
  );

  console.log(data);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="md:px-32 px-0 pt-8 text-2xl font-bold">
          Workout history
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 py-8 md:px-8 px-0 bg-white rounded-md p-8 gap-10">
          <div className="lg:col-span-2 md:col-span-2">
            <>
              {data.workouts.map((workout, idx: number) => {
                return (
                  <div
                    key={idx}
                    className=" sm:grid-cols-1 lg:grid-cols-2 py-8 md:px-8 bg-white rounded-md"
                  >
                    <div className="flex justify-between items-center max-w-lg">
                      <div>
                        <h1>Workout</h1>
                        <span className="block text-xs text-gray-400">
                          {workout.workoutName} Day
                        </span>
                      </div>
                      <div>
                        <h1>Date</h1>
                        <span className="block text-xs text-gray-400">
                          {moment(workout.date).format("MMM Do YY")}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white my-8 flex flex-col rounded-l-3xl">
                      <>
                        {workout.workoutLines.map((exercise, idx) => {
                          return (
                            <div key={idx} className="flex mb-4">
                              <img
                                className="rounded-l-3xl"
                                src={`${exercise.exercise.imageUrl}`}
                                alt="Picture of the author"
                                width={150}
                                height={200}
                              />
                              <div className="ml-4">
                                <>
                                  {exercise.logs.map((logs, idx) => {
                                    return (
                                      <span
                                        key={idx}
                                        className="block text-xs text-gray-400"
                                      >
                                        {logs.reps} reps . {logs.weight}kg
                                      </span>
                                    );
                                  })}
                                </>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
          <div className="lg:col-span-1 md:col-span-1">
            <CalenderComp />
          </div>
          {/* order-first flex justify-center items-center */}
        </div>
      </div>
    </Layout>
  );
};

export default calendar;
