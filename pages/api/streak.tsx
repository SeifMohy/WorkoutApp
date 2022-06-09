import {
  PrismaClient,
 
  Exercise,
  UserLog,
  WorkoutLine,
} from "@prisma/client";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";

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
  const { user } = await getUser({ req, res });
  if (user) {
    // Signed in
    try {
     

      let fullUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!fullUser) {
        return res.status(400).json({ msg: "no user" });
      }

      //--------streak counter ------------

      const userLogs = await prisma.userLog.findMany({
        where: { userId: fullUser?.id as string },
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


