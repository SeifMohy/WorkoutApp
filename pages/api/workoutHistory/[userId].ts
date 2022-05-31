import type { NextApiRequest, NextApiResponse } from 'next';
import { Excercise, PrismaClient, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { ProgressAPIResponseType } from 'types';
import { Collection } from "lodash";



type UserLogEnhanced = UserLog & {
  workoutLine: WorkoutLine & {
    excercise: Excercise;
  };
};

type Error = {
  message: string;
};

//TODO: Add type for response 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressAPIResponseType | Error>
) {
  const prisma = new PrismaClient();
  const { userId } = req.query;

  const userLogs = await prisma.userLog.findMany({
    where: { userId: userId as string },
    include: { workoutLine: { include: { excercise: true } } }
  });
  const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

  console.log(sortedUserLogs)

  const groupedData = _(sortedUserLogs).groupBy(
    (x: UserLogEnhanced) => x.date
  );

  res.status(200).json(groupedData);
}
