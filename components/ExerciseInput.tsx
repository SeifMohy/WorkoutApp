import React from 'react'
import { todaysWorkoutData } from 'types';
import { useFormik } from "formik";
import axios from "axios";

type props = {
    workout: todaysWorkoutData;
    workoutIndex: number;
    todaysWorkout: todaysWorkoutData[];
  };
  
function ExerciseInput({workout, workoutIndex, todaysWorkout }:props) {
    
    const initialValues = {
        workoutLogs: todaysWorkout?.map((workoutLine) => {
          return {
            weight: Array.from(Array(workoutLine.recSets)),
            reps: Array.from(Array(workoutLine.recSets)),
            workoutLineId: workoutLine.id,
          };
        }),
      };
      
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: async (values: any, resetForm: any) => {
          // formik.resetForm();
          console.log(values);
          const res = await axios.put("/api/userLogs/test", values); //This is on userLogs/test to avoid session errors
          console.log("userLogs", res);
        },
      });
      
  return (
    <div className="flex w-4/5 border-l-4 ml-[2rem] pl-[2.5rem]  md:w-[90%]">
                    <div className="flex-col justify-end w-full bg-white">
                      <div className="flex justify-start p-3 bg-gray-200 border">
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem]">
                          Set
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2">
                          Weight
                        </div>
                        <div className="mr-[0.5rem] rounded-2xl w-[3rem] md:w-[4rem] lg:w-[15rem] px-2 ml-[1.7rem] lg:ml-[5.7rem]">
                          Reps
                        </div>
                      </div>
                      {Array.from(Array(workout.recSets)).map(
                        (_, exerciseSetIndex) => (
                          <div className="mx-[0.5rem] py-[0.5rem] border-b-4" key={exerciseSetIndex}>
                          <div
                            
                            className="flex justify-start pb-3"
                          >
                            <div className="m-3 w-[3rem]">
                              {exerciseSetIndex + 1}
                            </div>
                            
                              <input
                                name={`workoutLogs[${workoutIndex}].weight[${exerciseSetIndex}]`}
                                placeholder={`${workout.recWeight}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] mx-[1rem] md:w-[12rem] lg:w-[19rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-gray-600 relative block  rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-100"
                              ></input> 


                              <input
                                name={`workoutLogs[${workoutIndex}].reps[${exerciseSetIndex}]`}
                                placeholder={`${workout.recReps}`}
                                onChange={formik.handleChange}
                                className="w-[3rem] mx-[1rem] md:w-[12rem] lg:w-[19rem] px-2 focus:bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 relative block rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300" 
                              ></input> 
                            </div>
                          </div> //TODO: make check button work and filter if not checked
                        )
                      )}
                    </div> 
                  </div>
  )
}

export default ExerciseInput