import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Workout } from "@prisma/client";

type Data = {
  data: Workout[] 
  //| WorkoutDelegate<RejectOnNotFound | RejectPerOperation | undefined>;
};

type Error = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const prisma = new PrismaClient();

  const workouts = await prisma.workout.findMany()

  console.log(workouts)

  res.status(200).json({ data: workouts });
}
