import React from "react";
import { Fragment, useState } from "react";
import Sidebar from "./sidebar";
import AccountProp from "./accountProp";
import { MenuIcon } from "@heroicons/react/solid";
import { Menu } from "@headlessui/react";

type headerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openAccount: boolean;
  setOpenAccount: (open: boolean) => void;
};

const header = ({ open, setOpen, openAccount, setOpenAccount }: headerProps) => {
console.log(open)
  return (
    <div>
      <Sidebar open={open} setOpen={setOpen} />
      <header className="relative">
        <nav className="flex justify-between items-center p-2">
          <button
            type="button"
            className="-ml-2 rounded-md bg-white p-2 text-gray-400"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </button>
          <div className="bg-white flex items-center ">
            Seif Mohy
            <Menu>
            <Menu.Button type="button" onClick={() => setOpenAccount(!openAccount)}>
              <img
                className="w-14 h-14 rounded-full m-2"
                src="/icon.png"
                alt="Rounded avatar"
              />
            </Menu.Button>
            <AccountProp
              openAccount={openAccount}
              setOpenAccount={setOpenAccount}
            />
            </Menu>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default header;
