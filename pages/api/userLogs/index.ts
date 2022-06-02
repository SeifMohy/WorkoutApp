import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkoutLine, PrismaClient } from '@prisma/client';
import { WorkoutLineData } from 'types';

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
  const prisma = new PrismaClient();
  const { userLogs } = req.body;

  console.log(userLogs);

  //   const workoutLine = await prisma.workoutLine.findMany(
  //     {where: { workoutId: todaysWorkoutId as string },
  //   include: {excercise: true}}
  //   )

  res.status(200).json({ data: userLogs });
}
