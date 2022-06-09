import React, { useEffect, useCallback } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import useSWR from 'swr';
import { WorkoutHistoryCard } from 'types/index';
import moment from 'moment';
import Image from "next/image";

interface Props {}
const Calendar:React.FC<Props> = () => {
  const fetchWorkoutHistory = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<WorkoutHistoryCard>(
    `/api/workoutHistory/workoutCard`,

    fetchWorkoutHistory
  );


  const workOutData = useCallback(async () => {
    const res = await axios.get('/api/workouthistory');
    const data = await res.data;
    console.log(
      data['Mon Apr 11 2022 12:35:55 GMT+0200 (Eastern European Standard Time)']
    );
  }, [])

  useEffect(() => {
    workOutData();
  }, [workOutData]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="px-0 pt-8 text-2xl font-bold md:px-32">
          Workout history
        </div>
        <div>
          <>
            {data?.workouts.map((workout, idx: number) => {
              return (
                <div key={workout.workoutName} className="grid px-0 py-8 bg-white rounded-md sm:grid-cols-1 lg:grid-cols-2 md:px-8">
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
                  <div className="flex my-8 bg-white rounded-l-3xl">
                    <>
                      {workout.workoutLines.map((exercise, idx:number) => {
                        return (
                          <div key={exercise.exercise.id}>
                            <Image
                              className="rounded-l-3xl"
                              src={`${exercise.exercise.imageUrl}`}
                              alt="Picture of the author"
                              width={150}
                              height={200}                            />
                            <div>
                              <>
                                {exercise.logs.map((logs, idx:number) => {
                                  return (
                                    <span key={logs.id} className="block text-xs text-gray-400">
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

export default Calendar;
