import type { NextApiRequest, NextApiResponse } from "next";
import { WorkoutLine, PrismaClient } from "@prisma/client";
import _ from 'lodash';
import { WorkoutLineData } from "types";
import {prisma} from "../prismaClient"


type Error = {
  message: string;
};

  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkoutLineData | Error>
) {
   prisma 
  const { todaysWorkoutId } = req.query;

  const workoutLine = await prisma.workoutLine.findMany(
    {where: { workoutId: todaysWorkoutId as string },
  include: {excercise: true, workout: true}}
  )

  const workout = _(workoutLine).groupBy(
    (x) => x.workoutId
  );

  console.log(workout)

  res.status(200).json({ data: workout });
}
