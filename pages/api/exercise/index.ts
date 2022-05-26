import type { NextApiRequest, NextApiResponse } from "next";
import { Excercise, PrismaClient } from "@prisma/client";

type Data = {
  data: Excercise[] 
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

  const exercise = await prisma.excercise.findMany()

  console.log(exercise)

  res.status(200).json({ data: exercise });
}
