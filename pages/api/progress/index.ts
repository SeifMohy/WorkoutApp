import type { NextApiRequest, NextApiResponse } from "next";
import { Exercise, User, UserLog, WorkoutLine } from "@prisma/client";
import _ from "lodash";
import { ProgressAPIResponseType } from "types";
import { prisma } from "../prismaClient";
import { getSession } from "next-auth/react";

type UserLogEnhanced = UserLog & {
  workoutLine: WorkoutLine & {
    exercise: Exercise;
  };
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressAPIResponseType | Error>
) {
  // prisma;

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
      include: { workoutLine: { include: { exercise: true } } },
    });
    const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

    const groupedData = _(sortedUserLogs).groupBy(
      (x: UserLogEnhanced) => x.workoutLine.exerciseId
    );

    const groupedDataClean = groupedData.map((value) => {
      //TODO: get max for weight for workout
      return {
        name: value[0].workoutLine.exercise.name,
        exercise: value[0].workoutLine.exercise,
        max: Math.max(
          ...value.map((x) => {
            return x.weight;
          })
        ),
        data: value.map((x) => {
          return x.weight;
        }),
        labels: value.map((x) => {
          return new Date(x.date);
        }),
      };
    });

    res.status(200).json(groupedDataClean);
  } catch (error) {
    console.log({ error });
    return res.status(500);
  }
}