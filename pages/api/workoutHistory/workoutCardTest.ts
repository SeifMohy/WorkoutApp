import type { NextApiRequest, NextApiResponse } from 'next';
import { Exercise, PrismaClient, UserLog, WorkoutLine } from '@prisma/client';
import _, { keys } from 'lodash';
import { GroupedData, ProgressAPIResponseType, WorkoutHistoryCard } from 'types';
import { Collection } from 'lodash';
import { prisma } from '../prismaClient';
import { getSession } from 'next-auth/react';

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkoutHistoryCard | Error>
) {
  prisma;
  const user = 'cl41ad4cw0080jep1zcb9ddxg';
  if (!user) {
    res.status(400);
  } else {
    const userLogs = await prisma.userLog.findMany({
      where: { userId: user as string },
      include: { workoutLine: { include: { exercise: true, workout: true } } }
    });

    const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

    console.log(sortedUserLogs);

    const groupedData = _(sortedUserLogs)
      .groupBy((x) => x.date)
      .entries();

      const groupedData2 = _(sortedUserLogs)
      .groupBy((x) => x.date)
      .entries();

    res.status(200).json(groupedData);
  }
}
