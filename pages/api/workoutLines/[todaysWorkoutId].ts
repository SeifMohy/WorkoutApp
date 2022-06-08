import type { NextApiRequest, NextApiResponse } from "next";
import { WorkoutLine, PrismaClient } from "@prisma/client";
import _ from "lodash";
import { WorkoutLineData } from "types/index";
import prisma from "prismaClient/index";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkoutLineData | Error>
) {
  try {
    const { todaysWorkoutId } = req.query;

    const workoutLine = await prisma.workoutLine.findMany({
      where: { workoutId: +(todaysWorkoutId as string) },
      include: { exercise: true },
    });

    console.log({ workoutLine });
    const workout = _(workoutLine).groupBy((x) => x.workoutId);

    console.log(workout);

    res.status(200).json({ data: workout });
  } catch (error) {
    res.status(500).json({ message: "there is an error" });
  }
}
