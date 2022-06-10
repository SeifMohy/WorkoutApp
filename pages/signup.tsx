import Image from 'next/image';
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import { authFullUser } from 'slices/auth.slice';
import { useAppDispatch } from 'store/hook';

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      age: '',
      weight: '',
      height: '',
      gender: ''
    },
    onSubmit: async (values: any, resetForm: any) => {
      console.log(values);
      const res = await axios.post('/api/user', values);
      const data :User = res.data.exists
      dispatch(authFullUser(data));
      console.log('data', data);
      router.push('/');
      resetForm();
    },
    validationSchema: Yup.object({
      age: Yup.number().required('this input is required'),
      weight: Yup.number().required('this input is required'),
      height: Yup.number().required('this input is required'),
      gender: Yup.string().required('this input is required')
    })
  });

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
                  name="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="age"
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                  onChange={formik.handleChange}
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
                  name="weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="weight"
                  onBlur={formik.handleBlur}
                  value={formik.values.weight}
                  onChange={formik.handleChange}
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
                  name="height"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="height"
                  onBlur={formik.handleBlur}
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <option>...</option>
                    <option>male</option>
                    <option>female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <p>gender is req</p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-gray-700 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 relative h-[110vh] hidden lg:block">
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
