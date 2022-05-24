import React from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  HomeIcon,
  LightningBoltIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import {useRouter} from "next/router"

const sidebarXl = () => {
  const router = useRouter()
  return (
    <div className="border-r border-gray-200 bg-white min-h-screen ">
      <div>
        <img className="w-18 h-14 bg-auto m-3" src="./logo.png" />
      </div>
      {/* pages list */}
      <div className="space-y-6 py-6 px-6">
        <div className="flow-root">
          <Link
            href="/dashboard"
            className="-m-2 flex p-2 font-medium text-gray-900 "
          >
            <a className={router.pathname === "/dashboard"? "bg-gray-100 flex m-2 rounded-md py-2" : "flex m-2 rounded-md py-2"}>
              <HomeIcon className="h-6 w-6 flex-shrink-0 text-gray-400 mx-2" />
              Dashboard
            </a>
          </Link>
          <Link
            href="/browseWorkouts"
            className="-m-2 flex p-2 font-medium text-gray-900"
          >
            <a className={router.pathname === "/browseWorkouts"? "bg-gray-100 flex m-2 rounded-md py-2" : "flex m-2 rounded-md py-2"}>
              <LightningBoltIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Browse Workouts
            </a>
          </Link>
          <Link
            href="/calendar"
            className="-m-2 flex p-2 font-medium text-gray-900"
          >
            <a className={router.pathname === "/calendar"? "bg-gray-100 flex m-2 rounded-md py-2" : "flex m-2 rounded-md py-2"}>
              <CalendarIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Calender
            </a>
          </Link>
          <Link
            href="/progress"
            className="-m-2 flex p-2 font-medium text-gray-900"
          >
            <a className={router.pathname === "/progress"? "bg-gray-100 flex m-2 rounded-md py-2" : "flex m-2 rounded-md py-2"}>
              <ChartBarIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Progress
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default sidebarXl;
