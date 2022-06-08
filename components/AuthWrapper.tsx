import { CircularProgress } from "@mui/material";

import { useRouter } from "next/router";
import React, { useEffect } from "react";


const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const authRoute = ["/dashboard", "/"];

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [router, status]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <CircularProgress color="inherit" className="w-[12rem]" />
      </div>
    );
  if (status === "unauthenticated") return null;

  return (
    <>
     {children}
    </>
  );
};

export default AuthWrapper;
