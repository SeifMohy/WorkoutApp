import React from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  HomeIcon,
  LightningBoltIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const sidebarXl = () => {
  return (
    <div className="border-r border-gray-200 bg-white min-h-screen ">
      <div>
        <img className="w-18 h-14 bg-auto m-3" src="./logo.png" />
      </div>
      {/* pages list */}
      <div className="space-y-6 py-6 px-6">
        <div className="flow-root">
          <a
            href="/dashboard"
            className="-m-2 flex p-2 font-medium text-gray-900"
          >
            <HomeIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2 xl: display" />
            Dashboard
          </a>
          <div>
            <a
              href="/browseWorkouts"
              className="-m-2 flex p-2 font-medium text-gray-900"
            >
              <LightningBoltIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Browse Workouts
            </a>
          </div>
          <div>
            <a
              href="/calendar"
              className="-m-2 flex p-2 font-medium text-gray-900"
            >
              <CalendarIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Calender
            </a>
          </div>
          <div>
            <a
              href="/progress"
              className="-m-2 flex p-2 font-medium text-gray-900"
            >
              <ChartBarIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-900 mx-2" />
              Progress
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sidebarXl;
