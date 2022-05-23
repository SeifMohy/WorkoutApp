import React from 'react'
import Footer from './footer'
import Header from './header'
import { useState } from "react";


type props = {
  children: React.ReactNode
}

function Layout({ children }: props) {
  const [openAccount, setOpenAccount] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClose(){
    if(openAccount === true){
      setOpenAccount(false);
    }
  }

  return (
    <div className="min-h-screen" onClick={() => handleClose()}>
      <div className="bg-white">
        <Header  open={open} setOpen={setOpen} openAccount={openAccount} setOpenAccount={setOpenAccount}/>
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
