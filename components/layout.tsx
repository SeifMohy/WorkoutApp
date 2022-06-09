import React from "react";
import Header from "./header";
import { useState} from "react";
import SidebarXl from "./sidebarXl";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "@supabase/supabase-auth-helpers/react";
type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  const { user, isLoading,error, accessToken,checkSession } = useUser();
  const [openAccount, setOpenAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullUser, setFullUser] = useState<User | null>();
  const router = useRouter();
  function handleClose() {
    if (openAccount === true) {
      setOpenAccount(false);
    }
  }

  const getFullUser = async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status !== 200) {
        router.push("/signup");
      }
      setFullUser(res.data.user);
    } catch (error) {
      router.push("/signup");
    }
  };

  useEffect(() => {
    getFullUser();
  }, []);

  useEffect(() => {
    console.log("sup dude", { user, isLoading })
    if (!isLoading && !user) {
    router.push("/signin");
      
    }
  }, [user, accessToken, isLoading])
  
  if (isLoading)
  return (
    <>
    loading...
    </>
  )
if (user && fullUser)

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
  return (
    <>
    redirecting....</>
  )
}

export default Layout;
