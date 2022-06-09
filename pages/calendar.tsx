import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CalenderComp from '../components/calendarComponent';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { WorkoutHistoryCard } from 'types/index';
import moment from 'moment';

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
        <>
          {data?.map((x) => {
            return (
              <div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 py-8 md:px-8 px-0 bg-white rounded-md">
                  <div>
                    <h1>Workout</h1>
                    <span className="block text-xs text-gray-400">
                      {
                        x[1].map((x: any) => {
                          return x.workoutLine.workout.name;
                        })[0]
                      }{' '}
                      Day
                    </span>
                  </div>
                  <div>
                    <h1>Date</h1>
                    <span className="block text-xs text-gray-400">
                      {moment(x[0]).format('MMM Do YY')}
                    </span>
                  </div>
                </div>
                {/* {x[1].map((x: any)=>{return (        
        <div className="bg-white my-8 flex rounded-l-3xl">
          <div className="rounded-l-3xl cardImage">
            <Image
              className="rounded-l-3xl"
              src={x[1].map((x: any)=>{return (x.workoutLine.workout.imgUrl)})[0]}
              alt="Picture of the author"
              width={150}
              height={200}
              objectFit="cover"
            />
          </div>
          <div className="pt-4 pl-8">
            <p>{x[1].map((x: any)=>{return (x.workoutLine.exercise.name)})[0]}</p>
            <span className="block text-xs text-gray-400">
              10 reps . 20kg
            </span>
            <span className="block text-xs text-gray-400">
              10 reps . 20kg
            </span>
            <span className="block text-xs text-gray-400">
              10 reps . 20kg
            </span>
            <span className="block text-xs text-gray-400">
              10 reps . 20kg
            </span>
            <p>View Exercise</p>
          </div>
        </div>)} */}
              </div>
            );
          })}
        </>
        {/* <div className="md:px-32 px-0 pt-8 text-2xl font-bold	">
          Workout history
        </div>
        <div className="grid gap-20 py-8 sm:grid-cols-1 lg:grid-cols-2 md:px-32 px-0">
          <div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 py-8 md:px-8 px-0 bg-white rounded-md">
              <div>
                <h1>Workout</h1>
                <span className="block text-xs text-gray-400">Cardio Day</span>
              </div>
              <div>
                <h1>Date</h1>
                <span className="block text-xs text-gray-400">{}</span>
              </div>
            </div>
            <div className="bg-white my-8 flex rounded-l-3xl">
              <div className="rounded-l-3xl cardImage">
                <Image
                  className="rounded-l-3xl"
                  src="/images/signin.jpg"
                  alt="Picture of the author"
                  width={150}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <div className="pt-4 pl-8">
                <p>jumping jacks</p>
                <span className="block text-xs text-gray-400">
                  10 reps . 20kg
                </span>
                <span className="block text-xs text-gray-400">
                  10 reps . 20kg
                </span>
                <span className="block text-xs text-gray-400">
                  10 reps . 20kg
                </span>
                <span className="block text-xs text-gray-400">
                  10 reps . 20kg
                </span>
                <p>View Exercise</p>
              </div>
            </div>
          </div> */}
        <div className="flex justify-center items-center	">
          <CalenderComp />
        </div>
      </div>
      {/* //</div> */}
    </Layout>
  );
};

export default calendar;
