import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useUser } from '@supabase/supabase-auth-helpers/react';

import { StreakInfo } from '../pages/dashboard';

type props = {
  userStreak: StreakInfo;
};
function DashboardHeadTab({ userStreak }: props) {
  const { user} = useUser();
  const data = user?.user_metadata;

  return (
    <div className="w-full bg-white border rounded-2xl">
      <div className="align-center flex flex-col items-start md:flex-row md:justify-between lg:flex-row  lg:justify-between bg-white p-[1.2rem]">
        <div className="flex flex-row items-center justify-center ">
          <div className="h-12 w-12 relative rounded-full overflow-hidden">
            <Image
              src={data?.avatar_url}
              alt="Avatar"
              layout="fill"
              objectFit='cover'
            />
          </div>
          <div className="flex flex-col items-start justify-start ml-5">
            <h3 className="text-[1.7rem] font-bold">{`Hello, ${data?.name}.`}</h3>
            <div className="flex">
              <p className="mx-1 text-xs font-light">&#128293;</p>
              <p className="text-xs font-light text-gray-600">
                {`${userStreak}`} Day Streak
              </p>
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
  );
}

export default DashboardHeadTab;
