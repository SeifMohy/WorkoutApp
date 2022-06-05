import { Exercise, Workout, WorkoutLine } from "@prisma/client";
import { Collection } from "lodash";

export type ProgressAPIResponseType = Collection<{
    name: string;
    exercise: Exercise;
    max: number;
    data: number[];
    labels: Date[];
  }>;
  
  export type WorkoutLineData = {
    data: _.Object<_.Dictionary<(WorkoutLine & {
      exercise: Exercise;
      workout: Workout;
  })[]>>
  };

  export interface todaysWorkoutData extends WorkoutLine {
    exercise: Exercise
  }