import { Exercise, UserLog, Workout, WorkoutLine } from '@prisma/client';
import { Collection } from 'lodash';

export type ProgressAPIResponseType = _.Collection<{
  name: string;
  exercise: Exercise;
  max: number;
  data: number[];
  labels: Date[];
}>;
export type WorkoutLineData = {
  data: _.Object<
    _.Dictionary<
      (WorkoutLine & {
        exercise: Exercise;
      })[]
    >
  >;
};

export interface todaysWorkoutData extends WorkoutLine {
  exercise: Exercise;
}

export type WorkoutInfo = {
  workout: Workout & {
    exercises: (WorkoutLine & {
      exercise: Exercise;
    })[];
  };
};

export type GroupedData = {
  data: _.Collection<Date>;
};

export type WorkoutHistoryCard = {
  workoutDates: _.Collection<string>;
  workouts: _.Collection<{
    date: Date;
    workoutName: string;
    workoutLines: _.Collection<{
      exercise: Exercise;
      logs: (UserLog & {
        workoutLine: WorkoutLine & {
          exercise: Exercise;
          workout: Workout;
        };
      })[];
    }>;
  }>;
};
