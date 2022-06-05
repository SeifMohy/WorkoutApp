import type { NextApiRequest, NextApiResponse } from "next";
import {  Exercise, PrismaClient } from "@prisma/client";
import {prisma} from "../prismaClient"

type Data = {
  data: Exercise[] 
  //| WorkoutDelegate<RejectOnNotFound | RejectPerOperation | undefined>;
};

type Error = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  
  prisma 

  const exercise = await prisma.exercise.findMany()

  console.log(exercise)

  res.status(200).json({ data: exercise });
}
