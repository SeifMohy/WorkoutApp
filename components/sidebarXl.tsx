import React from 'react';
import {
  HomeIcon,
  LightningBoltIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LogoPic from 'assets/images/logo.png';

interface Props {}

const SidebarXl: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white border-r border-gray-200 ">
      <div>
        <div className="relative w-64 h-[5.5rem] m-3 bg-auto">
          <Image src={LogoPic} objectFit="contain" alt="img" layout="fill" />
        </div>
      </div>
      <div className="px-6 py-6 space-y-6">
        <div className="flow-root">
          <Link
            href="/dashboard"
            className="flex p-2 -m-2 font-medium text-gray-900 "
          >
            <a
              className={
                router.pathname === '/dashboard'
                  ? 'bg-gray-100 flex m-2 rounded-md py-2'
                  : 'flex m-2 rounded-md py-2'
              }
            >
              <HomeIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400" />
              Dashboard
            </a>
          </Link>
          <Link
            href="/browseWorkouts"
            className="flex p-2 -m-2 font-medium text-gray-900"
          >
            <a
              className={
                router.pathname === '/browseWorkouts'
                  ? 'bg-gray-100 flex m-2 rounded-md py-2'
                  : 'flex m-2 rounded-md py-2'
              }
            >
              <LightningBoltIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
              Browse Workouts
            </a>
          </Link>
          <Link
            href="/calendar"
            className="flex p-2 -m-2 font-medium text-gray-900"
          >
            <a
              className={
                router.pathname === '/calendar'
                  ? 'bg-gray-100 flex m-2 rounded-md py-2'
                  : 'flex m-2 rounded-md py-2'
              }
            >
              <CalendarIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
              Calender
            </a>
          </Link>
          <Link
            href="/progress"
            className="flex p-2 -m-2 font-medium text-gray-900"
          >
            <a
              className={
                router.pathname === '/progress'
                  ? 'bg-gray-100 flex m-2 rounded-md py-2'
                  : 'flex m-2 rounded-md py-2'
              }
            >
              <ChartBarIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
              Progress
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarXl;
