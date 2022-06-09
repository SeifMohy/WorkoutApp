import type { NextApiRequest, NextApiResponse } from "next";
import prisma  from "prismaClient";
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
    where: { id: user?.id as string },
  });

  if (!user) {
    res.status(400);
  }

  const userLogs = workoutLogs.map((workoutLine: any, idx: number) => {
    
    return {
      reps: +workoutLine?.reps[idx],
      weight: +workoutLine.weight[idx],
      userId: fullUser?.id,
      workoutLineId: workoutLine.workoutLineId,
      setNumber: +idx + 1,
    };
  });

  const userLog = await prisma.userLog.createMany({ data: userLogs });

  res.status(200).json({ data: userLog });
}
