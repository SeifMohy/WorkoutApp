import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../prismaClient";
import { getSession } from "next-auth/react";
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
  const user = await prisma.user.findUnique({
    where: { email: userEmail as string },
  });

  if (!user) {
    res.status(400);
  }
  const filteredWorkoutLogs = workoutLogs.filter((x: any)=> x.complete === true)
  const userLogs = filteredWorkoutLogs.map((log: any, idx: number) => {
    return {
      reps: +log.reps[idx],
      weight: +log.weight[idx],
      userId: user?.id,
      workoutLineId: log.workoutLineId,
      setNumber: +idx + 1,
    };
  });

  console.log(userLogs);

  const userLog = await prisma.userLog.createMany({ data: userLogs });

  res.status(200).json({ data: userLog });
}
