import {
  PrismaClient,
  User,
  Exercise,
  UserLog,
  WorkoutLine,
} from "@prisma/client";
import _, { values } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: add auth support

  switch (req.method) {
    case "GET":
      getUserStreak(req, res);
      break;
  }
}

type Data = {
  data: _.Object<
    _.Dictionary<
      (UserLog & {
        workoutLine: WorkoutLine & {
          exercise: Exercise;
        };
      })[]
    >
  >;
};

async function getUserStreak(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    try {
      // const userEmail = session?.user?.email;
      const userEmail1 = "mahmoudezz878@gmail.com";
      const userEmail = "seifmohy@gmail.com";
      const userEmail3 = "nac9cm@gmail.com";

      let user = await prisma.user.findUnique({
        where: { email: userEmail! },
      });
      if (!user) {
        return res.status(400).json({ msg: "no user" });
      }

      //--------streak counter ------------

      const userLogs = await prisma.userLog.findMany({
        where: { userId: user?.id as string },
        include: { workoutLine: { include: { exercise: true } } },
      });
      const amendDate = userLogs.map((x) => x.date.setUTCHours(0, 0, 0, 0));
      const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

      const groupedData = _(sortedUserLogs)
        .groupBy((x) => x.date)
        .entries()
        .map((date) => {
          return { date: new Date(date[0]) };
        });

      let count = 0;
      let startDate = new Date();
      groupedData.reverse().forEach((el, i) => {
        const days =
          startDate.setUTCHours(0, 0, 0, 0) -
            new Date(el.date).setUTCHours(0, 0, 0, 0) ===
          i * 86400000;
        console.log(days);
        if (days) count++;
      });
      console.log(count);
      //---------- end streak counter

      res.status(200).json(count);
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ msg: "something went wrong", err });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}


