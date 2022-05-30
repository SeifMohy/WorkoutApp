import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { Workout } from '@prisma/client';

const fetchWorkouts = (url: string) => axios.get(url).then((res) => res.data);

const [screenWidth, setScreenWidth] = useState(window.innerWidth)

const browseWorkouts = () => {
  const { data, error } = useSWR(`/api/workouts`, fetchWorkouts);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [screenWidth])

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5 pt-8">
        <div className="text-2xl text-center font-extrabold">
          Browse our carefully curated workouts
        </div>
        <div className="text-md text-center font-light m-2">
          Thoughtfully designed workouts meant to push you to the absolute
          limits
        </div>
        <div className="grid lg:grid-cols-3 gap-5 mt-10 relative">
          {data.data.map((workout: Workout) => {
            return (
              <div>
                <Image
                  object-fit="contain"
                  src="/images/signin.jpg"
                  alt="workout picture"
                  layout="responsive"
                  width={80}
                  height={80}
                  className="w-full object-fill p-3 rounded-2xl"
                />
                <div>{workout.name}</div>
                <div>description</div>
              </div>
            ); // TODO: Need to add a description for each workout
          })}
        </div>
      </div>
    </Layout>
  );
};
