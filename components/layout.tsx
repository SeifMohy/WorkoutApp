import React from 'react';
import Header from './header';
import { useState } from 'react';
import SidebarXl from './sidebarXl';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { authFullUser } from 'slices/auth.slice';
import { authState } from '../slices/auth.slice';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useUser();
  const fullUser = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const [openAccount, setOpenAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function handleClose() {
    if (openAccount === true) {
      setOpenAccount(false);
    }
  }

  const getFullUser = async () => {
    try {
      const res = await axios.get('/api/user');

      if (res.status !== 200) {
        router.push('/signup');
      }
      dispatch(authFullUser(res.data.fullUser));
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
