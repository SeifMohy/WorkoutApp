import React from "react";
import { todaysWorkoutData } from "types/index";
import Image from "next/image";

type props = {
  workout: todaysWorkoutData;
};
const ExerciseIndex:React.FC<props> =({ workout }) => {
  return (
    <div className="flex items-stretch">
      <div className="relative m-2 border-4 border-white border-solid rounded-full w-14 h-14 overflow-hidden">
          <Image
            objectFit="cover"
            src={workout.exercise.imageUrl}
            alt="Rounded avatar"
            layout='fill'
          />
      </div>
      <div className="self-center">
        <div className="text-xl font-bold">{workout.exercise.name}</div>
        <div className="text-xs font-light text-gray-600">
          {workout.recSets} Sets x {workout.recReps} Reps
        </div>
      </div>
    </div>
  );
}

export default ExerciseIndex;
