// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    try {
      const prisma = new PrismaClient();
      const userEmail = session?.user?.email;
      const user = await prisma.user.findUnique({
        where: { email: userEmail! },
      });
      res.status(200).json({ msg: "user info", user });
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
