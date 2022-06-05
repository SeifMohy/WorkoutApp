import type { NextApiRequest, NextApiResponse } from 'next';
import { Exercise, User, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { ProgressAPIResponseType } from 'types';
import { prisma } from '../prismaClient';

type UserLogEnhanced = UserLog & {
  workoutLine: WorkoutLine & {
    exercise: Exercise;
  };
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressAPIResponseType | Error>
) {
  prisma;
  const { userEmail } = req.query;

  const user = await prisma.user.findMany({
    where: { email: userEmail as string }
  });
  console.log(user);

  const userLogs = await prisma.userLog.findMany({
    where: { userId: user.id as string },
    include: { workoutLine: { include: { exercise: true } } }
  });
  const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

  const groupedData = _(sortedUserLogs).groupBy(
    (x: UserLogEnhanced) => x.workoutLine.exerciseId
  );

  const groupedDataClean = groupedData.map((value) => {
    return {
      name: value[0].workoutLine.exercise.name,
      exercise: value[0].workoutLine.exercise,
      max: Math.max(
        ...value.map((x) => {
          return x.weight;
        })
      ),
      data: value.map((x) => {
        return x.weight;
      }),
      labels: value.map((x) => {
        return new Date(x.date);
      })
    };
  });

  res.status(200).json(groupedDataClean);
}
