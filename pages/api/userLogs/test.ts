import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../prismaClient';
import { getSession } from 'next-auth/react';
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

  const session = await getSession({ req });
  const userEmail = session?.user?.email;
  // const user = await prisma.user.findUnique({
  //   where: { email: userEmail as string },
  // });
  const user = 'cl41ad4cw0080jep1zcb9ddxg';

  if (!user) res.status(400);

  //TODO: New intermediate array with an object of reps and weights, then filter if any of them is undefined

  const reps = workoutLogs.map((workoutLine: any) => {
    return workoutLine.reps;
  });
  const weight = workoutLogs.map((workoutLine: any) => {
    return workoutLine.weight;
  });

  let answer: any = [];

  const userLogs = workoutLogs.map((workoutLine: any, idx: number) => {
    const reps = workoutLine.reps;
    const weight = workoutLine.weight;
    for (let i = 0; i < workoutLine.reps.length; i++) {
      if (reps[i] && weight[i]) {
        answer.push({
          reps: +reps[i],
          weight: +weight[i],
          userId: user,
          //?.id,
          workoutLineId: workoutLine.workoutLineId,
          setNumber: i + 1
        });
      }
    }
  });

  console.log(answer)
  const userLog = await prisma.userLog.createMany({ data: answer });
  res.status(200).json({ data: userLog });
}
