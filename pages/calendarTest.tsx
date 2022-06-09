
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import CalenderComp from "../components/calendarComponent";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import { WorkoutHistoryCard } from "types/index";
import moment from "moment";

const fetchWorkoutHistory = (url: string) =>
  axios.get(url).then((res) => res.data);
interface Props {}
const Calendar:React.FC<Props>  = () => {
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
      <div className="min-h-screen bg-gray-100">
        <div className="px-0 pt-8 text-2xl font-bold md:px-32">
          Workout history
        </div>
        <div className="grid gap-10 p-8 px-0 py-8 bg-white rounded-md sm:grid-cols-1 lg:grid-cols-3 md:px-8">
          <div className="lg:col-span-2 md:col-span-2">
            <>
              {data.workouts.map((workout, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="py-8 bg-white rounded-md sm:grid-cols-1 lg:grid-cols-2 md:px-8"
                  >
                    <div className="flex items-center justify-between max-w-lg">
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

                    <div className="flex flex-col my-8 bg-white rounded-l-3xl">
                      <>
                        {workout.workoutLines.map((exercise, idx) => {
                          return (
                            <div key={idx} className="flex mb-4">
                              <Image
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

export default Calendar;
