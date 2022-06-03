import { Excercise, Workout, WorkoutLine } from "@prisma/client";
import { Collection } from "lodash";

export type ProgressAPIResponseType = Collection<{
    name: string;
    exercise: Excercise;
    max: number;
    data: number[];
    labels: Date[];
  }>;
  
  export type WorkoutLineData = {
    data: _.Object<_.Dictionary<(WorkoutLine & {
      excercise: Excercise;
      workout: Workout;
  })[]>>
  };

  export interface todaysWorkoutData extends WorkoutLine {
    excercise: Excercise
  }