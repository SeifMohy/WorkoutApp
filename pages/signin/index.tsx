import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const SignIn = () => {
  const [provider, setProvider] = useState<any>({});

  const gitProviderList = async () => {
    const authProviders = await getProviders();
    setProvider(authProviders);    
    
  };

  useEffect(() => {
    gitProviderList();
  }, []);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
      <div className="lg:col-span-1 md:col-span-1 flex items-center justify-center">
        <div className="h-80 ">
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
            <button onClick={() => signIn()} className="bg-black w-full text-white py-3 rounded-md">
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 relative h-[100vh]">
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
