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
  //TODO: New intermediate array with an object of reps and weights, then filter if any of them is undefined 
  // const filteredWorkoutLogs = workoutLogs.map((x: any) => x.complete.findIndex((x:any)=> x===true))
  // console.log(filteredWorkoutLogs)
  const userLogs = workoutLogs.map((workoutLine: any, idx: number) => {
    
    return {
      reps: +workoutLine?.reps[idx],
      weight: +workoutLine.weight[idx],
      userId: user?.id,
      workoutLineId: workoutLine.workoutLineId,
      setNumber: +idx + 1,
    };
  });

  //console.log(userLogs);

  const userLog = await prisma.userLog.createMany({ data: userLogs });

  res.status(200).json({ data: userLog });
}
