import React from "react";
import Footer from "./footer";
import Header from "./header";
import { useState } from "react";
import SidebarXl from "./sidebarXl";
import {WorkoutProvider} from './WorkoutProvider'
type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  const [openAccount, setOpenAccount] = useState(false);
  const [open, setOpen] = useState(false);

  
  function handleClose() {
    if (openAccount === true) {
      setOpenAccount(false);
    }
  }

  

  return (

      <div className="min-h-screen" onClick={() => handleClose()}>
        <div className="grid grid-cols-4 bg-white ">
          <div className="hidden lg:block">
            <SidebarXl />
          </div>
          <div className="col-span-4 lg:col-span-3">
            <Header
              open={open}
              setOpen={setOpen}
              openAccount={openAccount}
              setOpenAccount={setOpenAccount}
            />
            {children}
          </div>
        </div>
      </div>


  );
}

export default Layout;
