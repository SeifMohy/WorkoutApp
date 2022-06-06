import {
  PrismaClient,
  User,
  Exercise,
  UserLog,
  WorkoutLine,
} from "@prisma/client";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: add auth support

  switch (req.method) {
    case "PUT":
      updateUserInfo(req, res);
      break;
    case "GET":
      getUserByEmail(req, res);
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

async function updateUserInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const userEmail = session?.user?.email;
    const { weight, height, age, gender } = req.body;
    console.log(req.body);

    const updateUserInfo = await prisma.user.updateMany({
      where: { email: userEmail },
      data: {
        weight: +weight,
        age: +age,
        height: +height,
        gender,
      },
    });

    res.status(200).json({ msg: "user info updated", updateUserInfo });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "something went wrong", details: err });
  }
}

async function getUserByEmail(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    // Signed in
    try {
      // const userEmail = session?.user?.email;
      const userEmail = "mahmoudezz878@gmail.com";

      let user = await prisma.user.findUnique({
        where: { email: userEmail! },
      });
      // console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "no user" });
      }
      //--------streaks counter ------------

      const userLogs = await prisma.userLog.findMany({
        where: { userId: user?.id as string },
        include: { workoutLine: { include: { exercise: true } } },
      });
      const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);

      // console.log(sortedUserLogs);

      const groupedData = _(sortedUserLogs).groupBy((x) => x.date);

      // const days = Object.keys(groupedData);
      // console.log(days);
      // console.log(arr);
      const arr = [
        {
          date: "2019-09-18",
        },
        {
          date: "2019-09-19",
        },
        {
          date: "2019-09-21",
        },
        {
          date: "2019-09-22",
        },
        {
          date: "2019-09-23",
        },
      ];

      // let arr= groupedData.map((x) => date)
      // let streaks = 0;
      console.log("hi")
     const streaks =  (arr)=> {
       console.log("first")
        let count = 0;
        let streakDatePoint = new Date();
        arr.reverse().forEach((el, i) => {
          if (
            new Date().setUTCHours(0, 0, 0, 0) -
              new Date(el.date).setUTCHours(0, 0, 0, 0) ===
            i * 86400000
          )
            count++;
            console.log("count")
        });
        console.log(count);
        return count;
      };
console.log(streaks);
      //---------- end streak counter

      res.status(200).json({
        msg: "user info",
        streaks: streaks,
        user: user,
        data: groupedData,
      });
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
