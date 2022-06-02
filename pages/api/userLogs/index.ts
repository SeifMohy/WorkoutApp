import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkoutLine, PrismaClient } from '@prisma/client';
import { WorkoutLineData } from 'types';
import { prisma } from '../prismaClient';

type Error = {
  message: string;
};

type Data = {
  data: [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Data>
) {
  prisma;
  const { workoutLogs } = req.body;

  const userId = workoutLogs.userId;
  const workoutLineId = workoutLogs.lineId;

  const userLogs = workoutLogs.map((log: any,idx:number) => {
      return{
          reps: log.reps[idx],
          weight: log.weight[idx],
          userId: log.userId,
          workoutLineId: log.workoutLineId
      }
  })

  console.log(userLogs);

  //   const workoutLine = await prisma.workoutLine.findMany(
  //     {where: { workoutId: todaysWorkoutId as string },
  //   include: {excercise: true}}
  //   )

  res.status(200).json({ data: userLogs });
}
