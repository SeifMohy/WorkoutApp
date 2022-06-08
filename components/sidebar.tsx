import React from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  XIcon,
  HomeIcon,
  LightningBoltIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

type sidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const sidebar: React.FC<sidebarProps> = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        as="div"
        className="relative z-40"
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="scale-0"
          enterTo="opacity-100 scale-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* dims screen on click */}
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as="div"
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* sidebar */}
            <div className="w-80 bg-white h-full">
              {/* close button */}
              <div className="flex justify-between px-4 pt-5 pb-2 ">
                <img className="w-18 h-14 bg-auto m-2" src="/images/logo.png" />
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              {/* pages list */}
              <div className="space-y-6 border-t border-gray-200 py-6 px-6">
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default sidebar;
