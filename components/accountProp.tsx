import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type accountProps = {
  openAccount: boolean;
  setOpenAccount: (open: boolean) => void;
};

const accountProp = ({ openAccount, setOpenAccount }: accountProps) => {
  return (
    <Transition
      as="div"
      show={openAccount}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          Account info
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default accountProp;
