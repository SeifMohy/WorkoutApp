import type { NextApiRequest, NextApiResponse } from 'next';
import { Exercise, PrismaClient, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { ProgressAPIResponseType } from 'types';
import { Collection } from "lodash";
import {prisma} from "../prismaClient"


type Data = {
  data:  _.Object<_.Dictionary<(UserLog & {
    workoutLine: WorkoutLine & {
        exercise: Exercise;
    };
})[]>>
};

type Error = {
  message: string;
};

//TODO: Add type for response 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  prisma 
  const { userId } = req.query;

  const userLogs = await prisma.userLog.findMany({
    where: { userId: userId as string },
    include: { workoutLine: { include: { exercise: true } } }
  });
  const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

  console.log(sortedUserLogs)

  const groupedData = _(sortedUserLogs).groupBy(
    (x) => x.date
  );
  //cl417pgv20010jo80qzrall78

  res.status(200).json({data: groupedData});
}
