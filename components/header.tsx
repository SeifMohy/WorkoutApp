import React from "react";
import Sidebar from "./sidebar";
import AccountProp from "./accountProp";
import { MenuIcon } from "@heroicons/react/solid";
import { Menu } from "@headlessui/react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Image from "next/image";



interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  openAccount: boolean;
  setOpenAccount: (open: boolean) => void;
}
const Header:React.FC<Props>= ({
  open,
  setOpen,
  openAccount,
  setOpenAccount,
}) => {
  const { user } = useUser();
  const data = user?.user_metadata;
  return (
    <div>
      <Sidebar open={open} setOpen={setOpen} />
      <header className="relative">
        <nav className="flex items-center justify-between px-4 lg:justify-end">
          <button
            type="button"
            className="block p-2 -ml-2 text-gray-400 bg-white rounded-md lg:hidden"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="flex-shrink-0 w-8 h-8 text-gray-400 group-hover:text-gray-500" />
          </button>
          <div className="flex items-center bg-white">
            {data?.name}
            <Menu>
              <Menu.Button
                type="button"
                onClick={() => setOpenAccount(!openAccount)}
              >
                <div className="relative w-10 h-10 m-2 overflow-hidden rounded-full">
                  <Image
                    objectFit="cover"
                    src={data?.avatar_url}
                    alt="Rounded avatar"
                    layout='fill'
                  />
                </div>
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

export default Header;
