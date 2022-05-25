// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

//USER
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const prisma = new PrismaClient();
//   await prisma.user.create({
//     data:{
//       firstName: "firstName",
//       lastName: "lastName",
//       email: "email",
//       password: "password",
//       gender: false,
//       age: 12,
//       weight: 12,
//       height: 12,
//     }
//   });
//   res.status(200).json({ name: "John Doe" });
// }

//Workout
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const prisma = new PrismaClient();
//   await prisma.workout.create({
//     data:{
//       name: "Legs",
//       imgUrl: "Image of Leg Day",
//     }
//   });
//   res.status(200).json({ name: "John Doe" });
// }

//Exercise 
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const prisma = new PrismaClient();
//   await prisma.excercise.create({
//     data:{
//       name: "Squat",
//       videoUrl: "Video of Squats",
//       description: "space legs shoulders lenth...",
//     }
//   });
//   res.status(200).json({ name: "John Doe" });
// }

//workoutLine 
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const prisma = new PrismaClient();
//   await prisma.workoutLine.create({
//     data:{
//       recWeight: 10,
//       recSets: 2,
//       recReps: 3,
//       steps: 1,
//       exerciseId: 1,
//       workoutId: 1,
//     }
//   });
//   res.status(200).json({ name: "John Doe" });
// }

//userLog
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const prisma = new PrismaClient();
  // await prisma.user.create({
  //   data:{
  //     firstName: "firstName",
  //     lastName: "lastName",
  //     email: "email",
  //     password: "password",
  //     gender: false,
  //     age: 12,
  //     weight: 12,
  //     height: 12,
  //   }
  // });
  res.status(200).json({ name: "John Doe" });
}
  const prisma = new PrismaClient();
  await prisma.userLog.create({
    data:{
      weight: 10,
      setNumber: 2,
      reps: 3,
      userId: 1,
      workoutLineId: 1,
    }
  });
  res.status(200).json({ name: "John Doe" });
}
