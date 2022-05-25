import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";

const Signup = () => {

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 ">
      <div className="lg:col-span-1 md:col-span-1 flex items-center justify-center ">
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
            <p className="font-bold pt-2 pb-2 	text-4xl">fill form</p>
          </div>
          <div className="">
            <form>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  age
                </label>
                <input
                  type="number"
                  id="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="age"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  weight
                </label>
                <input
                  type="number"
                  id="weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="weight"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  height
                </label>
                <input
                  type="number"
                  id="height"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="height"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
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

export default Signup;
