import React from "react";
import { Menu, Transition } from "@headlessui/react";

import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/router";
type accountProps = {
  openAccount: boolean;
  setOpenAccount: (open: boolean) => void;
};

const AccountProp:React.FC<accountProps> = ({ openAccount, setOpenAccount }) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const router = useRouter();
  const signoutWithGoogle = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/signin");
}
 
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
      <Menu.Items className="absolute right-0 w-56 mt-8 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          <a className="p-2 text-gray-500">Your Profile</a>
        </div>
        <div>
          
          <button className="p-2 text-gray-500" onClick={()=>signoutWithGoogle()}>Sign Out</button>
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default AccountProp;
