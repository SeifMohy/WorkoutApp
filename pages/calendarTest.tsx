import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CalenderComp from '../components/calendarComponent';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { WorkoutHistoryCard } from 'types';
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
        <div className="md:px-32 px-0 pt-8 text-2xl font-bold">
          Workout history
        </div>
        <div>
          <>
            {data.map((x) => {
              return (
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
                  <div className="bg-white my-8 flex rounded-l-3xl">
                  <img
                              className="rounded-l-3xl"
                              src="/images/signin.jpg"
                              alt="Picture of the author"
                              width={150}
                              height={200}
                            />
                    <>
                      {x[1].map((x) => {
                        return (
                            <span className="block text-xs text-gray-400">
                            {x.reps} reps . {x.weight}kg
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
    </Layout>
  );
};

export default calendar;
