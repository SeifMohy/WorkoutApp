import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
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
        <div className="md:px-32 px-0 pt-8 text-2xl font-bold">
          Workout history
        </div>
        <div>
          <>
            {data.workouts.map((workout, idx: number) => {
              return (
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 py-8 md:px-8 px-0 bg-white rounded-md">
                  <div>
                    <h1>Workout</h1>
                    <span className="block text-xs text-gray-400">
                      {workout.workoutName} Day
                    </span>
                  </div>
                  <div>
                    <h1>Date</h1>
                    <span className="block text-xs text-gray-400">
                      {moment(workout.date).format('MMM Do YY')}
                    </span>
                  </div>
                  <div className="bg-white my-8 flex rounded-l-3xl">
                    <>
                      {workout.workoutLines.map((exercise) => {
                        return (
                          <div>
                            <img
                              className="rounded-l-3xl"
                              src={`${exercise.exercise.imageUrl}`}
                              alt="Picture of the author"
                              width={150}
                              height={200}
                            />
                            <div>
                              <>
                                {exercise.logs.map((logs) => {
                                  return (
                                    <span className="block text-xs text-gray-400">
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
      </div>
    </Layout>
  );
};

export default calendar;
