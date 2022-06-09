import type { NextApiRequest, NextApiResponse } from 'next';
import { Exercise, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";

import prisma from "prismaClient"



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
  // const { userId } = req.query;

 
  const { user } = await getUser({ req, res });

  const fullUser = await prisma.user.findUnique({
    where: { id: user?.id as string }
  });
  console.log(user);

  const userLogs = await prisma.userLog.findMany({
    where: { userId: user?.id as string },
    include: { workoutLine: { include: { exercise: true } } }
  });
  const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

  console.log(sortedUserLogs)

  const groupedData = _(sortedUserLogs).groupBy(
    (x) => x.date
  );

  res.status(200).json({data: groupedData});
}
