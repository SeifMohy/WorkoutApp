import React from 'react';
import Header from './header';
import { useState } from 'react';
import SidebarXl from './sidebarXl';
import { User } from '@prisma/client';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '@supabase/supabase-auth-helpers/react';
type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useUser();
  const [openAccount, setOpenAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullUser, setFullUser] = useState<User | null>();
  const router = useRouter();
  function handleClose() {
    if (openAccount === true) {
      setOpenAccount(false);
    }
  }
  console.log(fullUser);

  const getFullUser = async () => {
    try {
      const res = await axios.get('/api/user');

      if (res.status !== 200) {
        router.push('/signup');
      }

      console.log({u: res.data})
      setFullUser(res.data.fullUser);
    } catch (error) {
      console.log(error);
      router.push('/signup');
    }
  };

  useEffect(() => {
    getFullUser();
  }, []);

  useEffect(() => {
    // if (!user) {
    //   router.push("/signin");
    // }

    if (!isLoading && !user) {
      router.push('/signin');
    }
    // if (router.pathname === '/' && !user) {
    //   router.push('/signin');
    // }
  }, [user, router, fullUser]);

  if (isLoading) return <>loading...</>;
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

  return <>redirecting...</>;
};

export default Layout;
