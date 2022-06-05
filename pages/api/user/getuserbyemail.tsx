// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import { getSession } from 'next-auth/react';
import {prisma} from "../prismaClient"

type Data = {
  user: User;
};

type Msg = {
  msg: string;
};

type Error = {
  err: any;
};
export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | Msg>
) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    try {
      const userEmail = session?.user?.email;
      const user = await prisma.user.findUnique({
        where: { email: userEmail! },
      });
      console.log(user)
      if (!user) {
        return res.status(400).json({ msg: 'no user' });
      }
      res.status(200).json({ msg: 'user info', user: user });
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ msg: 'something went wrong', err });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
