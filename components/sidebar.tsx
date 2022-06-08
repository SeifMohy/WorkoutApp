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
            <div className="h-full bg-white w-80">
              {/* close button */}
              <div className="flex justify-between px-4 pt-5 pb-2 ">
                <img className="w-64 h-[5.5rem] m-2 bg-auto" src="./logo.png" />
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              {/* pages list */}
              <div className="px-6 py-6 space-y-6 border-t border-gray-200">
                <div className="flow-root">
                  <Link href="/dashboard" >
                  <a
                    
                    className="flex p-2 -m-2 font-medium text-gray-900"
                  >
                    <HomeIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900 xl: display" />
                    Dashboard
                  </a>
                  </Link>
                  <div>
                    <Link href="/browseWorkouts">
                      <a
                        className="flex p-2 -m-2 font-medium text-gray-900"
                      >  
                    
                      <LightningBoltIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
                      Browse Workouts
                    </a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/calendar">
                      <a
                        
                        className="flex p-2 -m-2 font-medium text-gray-900"
                      >
                        <CalendarIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
                        Calender
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/progress">
                      <a
                        
                        className="flex p-2 -m-2 font-medium text-gray-900"
                      >
                        <ChartBarIcon className="flex-shrink-0 w-6 h-6 mx-2 text-gray-400 group-hover:text-gray-900" />
                        Progress
                      </a> 
                    </Link>
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
