// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import {prisma} from "../prismaClient"


type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in

    try {
      prisma 
      const userEmail = session?.user?.email;
      const { weight, height, age, gender } = req.body;
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
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
