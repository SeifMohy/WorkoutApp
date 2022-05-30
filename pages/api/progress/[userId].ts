import type { NextApiRequest, NextApiResponse } from 'next';
import { Excercise, PrismaClient, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { ProgressAPIResponseType } from 'types';


type UserLogEnhanced = UserLog & {
  workoutLine: WorkoutLine & {
    excercise: Excercise;
  };
};

type Error = {
  message: string;
};

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

  const groupedData = _(sortedUserLogs).groupBy(
    (x: UserLogEnhanced) => x.workoutLine.exerciseId
  );

  const groupedDataClean = groupedData.map((value, key) => {
    return {
      name: value[0].workoutLine.excercise.name,
      exercise: value[0].workoutLine.excercise,
      max: Math.max(
        ...value.map((x) => {
          return x.weight * x.reps;
        })
      ),
      data: value.map((x) => {
        return x.weight * x.reps;
      }),
      labels: value.map((x) => {
        return new Date(x.date);
      })
    };
  });

  console.log(groupedDataClean);

  res.status(200).json(groupedDataClean);
}
