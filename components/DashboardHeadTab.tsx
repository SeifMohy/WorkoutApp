import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import {StreakInfo} from '../pages/dashboard'
type props = {
  userStreak:StreakInfo
}

function DashboardHeadTab({userStreak}:props) {

    const session = useSession();
  return (
    <div className="w-full bg-white border rounded-2xl">
          <div className="align-center flex flex-col items-start md:flex-row md:justify-between lg:flex-row  lg:justify-between bg-white p-[1.2rem]">
            <div className="flex flex-row items-center justify-center ">
              <div className="h-[4rem] w-[4rem] relative rounded-full">
                <Image
                  src={session?.data?.user?.image || "/icon.png"}
                  alt="Avatar"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start justify-start ml-5">
                <h3 className="text-[1.7rem] font-bold">{`Hello, ${session?.data?.user?.name?.replace(
                  /[0-9]/g,
                  ""
                )}.`}</h3>
                <div className="flex">
                  <p className="mx-1 text-xs font-light">&#128293;</p>
                  <div className="text-xs font-light text-gray-600">
                    {""} {`${userStreak}`} Day Streak
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button className="mx-[0.5rem] my-[0.5rem] bg-white text-black border rounded-2xl p-[0.6rem] transition ease-in-out delay-150 hover:bg-black hover:text-white hover:scale-105 duration-300 ...">
                <Link href="/browseWorkouts">
                  <a>Browse Workouts</a>
                </Link>
              </button>
              <button className="mx-[0.5rem] my-[0.5rem] bg-white text-black border rounded-2xl p-[0.6rem] transition ease-in-out delay-150 hover:bg-black hover:text-white hover:scale-105 duration-300 ...">
                <Link href="#workoutTitle">
                  <a>Start {`Today's`} Workout</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
  )
}

export default DashboardHeadTab