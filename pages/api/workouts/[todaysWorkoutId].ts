import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, UserLog } from '@prisma/client';

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
  const { todaysWorkoutId } = req.query;

  console.log(todaysWorkoutId);

  if (!todaysWorkoutId) {
    return res.status(404).json({ message: 'User not Found' });
  }

  const userLogs = await prisma.userLog.findMany({
    where: { userId: userId as string }, // fix
    include: { workoutLine: true }
  });

  console.log(userLogs);

  res.status(200).json({ data: userLogs });
}