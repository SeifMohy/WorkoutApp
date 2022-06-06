import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../prismaClient';

type Error = {
  message: string;
};

type Data = {
  data: {};
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Data>
) {
  prisma;
  const { workoutLogs } = req.body;

  const userLogs = workoutLogs.map((log: any,idx:number) => {
      return{
          reps: +log.reps[idx],
          weight: +log.weight[idx],
          userId: log.userId, //TODO: set User ID from session
          workoutLineId: log.workoutLineId,
          setNumber: +idx+1
      }
  })

  console.log(userLogs);

  const userLog = await prisma.userLog.createMany(
    {data: userLogs}
  )

  res.status(200).json({ data: userLog });
}
