import type { NextApiRequest, NextApiResponse } from 'next';
import  prisma from 'prismaClient';
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";

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

  const { user } = await getUser({ req, res });

  const fullUser = await prisma.user.findUnique({
    where: { id: user?.id  },
  });


  if (!fullUser) res.status(400);

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
          userId: fullUser?.id,
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
