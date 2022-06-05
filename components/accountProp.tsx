import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

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
      <Menu.Items className="absolute right-0 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          <a className="p-2 text-gray-500">Your Profile</a>
        </div>
        <div>
          <a onClick={() => signOut()} className="p-2 text-gray-500">Sign Out</a>
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default accountProp;
