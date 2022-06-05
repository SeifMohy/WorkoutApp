import {
  signIn,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const SignIn = () => {
  const [authProviders, setAuthProviders] = useState<ClientSafeProvider[]>([]);

  const gitProviderList = async () => {
    const res = await getProviders();

    const data = res && Object.values(res).map((x) => x);
    console.log({ data });

    if (data) setAuthProviders(data);
  };

  console.log({ authProviders });

  useEffect(() => {
    gitProviderList();
  }, []);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 ">
      <div className="lg:col-span-1 md:col-span-1 flex items-center justify-center h-screen">
        <div className="h-80 px-4 ">
          <div>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={300}
              height={100}
              objectFit="cover"
            />
          </div>
          <div>
            <p className="font-bold pt-2 pb-2 	text-4xl">
              Sign in to your account
            </p>
            <span className="">Or create a new acount</span>
          </div>
          <div className="w-full mt-6">
            {authProviders &&
              authProviders.map((authProvider: any) => {
                return (
                  <button
                    key={authProvider.id}
                    onClick={() =>
                      signIn(authProvider.id, {
                        callbackUrl: "http://localhost:3000/dashboard",
                      })
                    }
                    className="bg-black w-full mb-2 text-white py-3 rounded-md"
                  >
                    {authProvider.name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 relative h-[100vh] hidden lg:block">
        <Image
          src="/images/signin.jpg"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
