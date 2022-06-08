import { Exercise, UserLog, Workout, WorkoutLine } from "@prisma/client";
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
  })[]>>
  };

  export interface todaysWorkoutData extends WorkoutLine {
    exercise: Exercise
  }

  export type WorkoutInfo =
  | Workout & {
      exercises: (WorkoutLine & {
        exercise: Exercise;
      })[];
    };
  
    export type GroupedData = {
      data: _.Collection<Date>}
    
export type WorkoutHistoryCard = _.Collection<[string, (UserLog & {
  workoutLine: WorkoutLine & {
      exercise: Exercise;
      workout: Workout;
  };
})[]]>