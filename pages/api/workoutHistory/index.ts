import type { NextApiRequest, NextApiResponse } from 'next';
import { Exercise, PrismaClient, UserLog, WorkoutLine } from '@prisma/client';
import _ from 'lodash';
import { ProgressAPIResponseType } from 'types';
import { Collection } from "lodash";
import {prisma} from "../prismaClient"
import { getSession } from "next-auth/react";


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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  prisma
  try {
    const session = await getSession({ req });


    if (!session) {
      res.status(400);
    } else {
      const userEmail = session?.user?.email;
      console.log({ userEmail, session });
  
      const user = await prisma.user.findUnique({
        where: { email: userEmail as string },
      });
      if (!user) {
        res.status(400);
      }else{      const userLogs = await prisma.userLog.findMany({
        where: { userId: user?.id as string },
        include: { workoutLine: { include: { exercise: true } } }
      });
      const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);
  
      console.log(sortedUserLogs)
  
      const groupedData = _(sortedUserLogs).groupBy(
        (x) => x.date
      );
  
      res.status(200).json({ data: groupedData });}

    }

  } catch (error) {
    console.log({ error });
    return res.status(500);
  }
}
