import { Exercise, PrismaClient, Workout, WorkoutLine } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Response = { msg: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { wid } = req.query;

      const workout = await prisma.workout.findFirst({
        where: { id: +(wid as string) },
        include: { exercises: { include: { exercise: true } } },
      });
      if (!workout) {
        res.status(400).json({ msg: "no workout found" });
      } else {
        res.status(200).json(workout);
      }
    } catch (error) {
      res.status(500).json({ msg: "no workout found" });
    }
  }
  // else if (req.method === 'POST') {
  //   try {
  //     const { name, imgUrl } = req.body
  //     const workout = await prisma.workout.create({
  //       data: {
  //         name,
  //         imgUrl,
  //       },
  //     })
  //     res.status(200).json({ msg: 'workout created', workout })
  //   } catch (err) {
  //     res.status(400).json({ msg: 'something went wrong', details: err })
  //   }
  // }
}
