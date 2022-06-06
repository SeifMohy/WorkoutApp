import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, UserLog } from '@prisma/client';
import { getSession } from "next-auth/react";

type Data = {
  data: UserLog[];
};

type Error = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const prisma = new PrismaClient();
  try {
    const session = await getSession({ req });


    if (!session) {
      res.status(400);
    }

    const userEmail = session?.user?.email;
    console.log({ userEmail, session });

    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      res.status(400);
    }

  const userLogs = await prisma.userLog.findMany({
    where: { userId: user?.id as string },
    include: { workoutLine: true }
  });

  console.log(userLogs);

  res.status(200).json({ data: userLogs });
} catch (error) {
  console.log({ error });
  return res.status(500);
}
}
