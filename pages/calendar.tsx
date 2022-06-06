import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import CalenderComp from "../components/calendarComponent";
import Image from "next/image";
import axios from "axios";

const calendar = () => {
  const [myDate, setMyDate] = useState("");



  const workOutData = async () => {
    const res = await axios.get('/api/workouthistory/1')
    const data = await res.data
    console.log(data["Mon Apr 11 2022 12:35:55 GMT+0200 (Eastern European Standard Time)"])
  }

  useEffect(() => {
    workOutData()
  },[])

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
      <div className="md:px-32 px-0 pt-8 text-2xl font-bold	">Workout history</div>
        <div className="grid gap-20 py-8 sm:grid-cols-1 lg:grid-cols-2 md:px-32 px-0">
          
          <div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 py-8 md:px-8 px-0 bg-white rounded-md">
              <div>
                <h1>Workout</h1>
                <span className="block text-xs text-gray-400">Cardio Day</span>
              </div>
              <div>
                <h1>Date</h1>
                <span className="block text-xs text-gray-400">{myDate}</span>
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
          </div>
          <div className="">
          <CalenderComp  />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default calendar;
