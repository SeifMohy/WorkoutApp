import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, UserLog } from "@prisma/client";

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
  const userId = req.body.userId;

  if (!userId) {
    return res.status(404).json({ message: "User not Found" });
  }

  const workoutLines = await prisma.userLog.findMany({ where: userId });

  res.status(200).json({ data: workoutLines });
}
