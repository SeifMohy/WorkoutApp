import React from "react";
import { todaysWorkoutData } from "types/index";

type props = {
  workout: todaysWorkoutData;
};
function ExerciseIndex({ workout }: props) {
  return (
    <div className="flex items-stretch">
      <img
        className="m-2 border-4 border-white border-solid rounded-full w-14 h-14"
        src={workout.exercise.imageUrl}
        alt="Rounded avatar"
      />
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
