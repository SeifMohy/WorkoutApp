import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";


import prisma from "prismaClient"



type Data = {
  data:  _.Collection<Date>}

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  prisma
  try {
    const { user } = await getUser({ req, res });


    if (!user) {
      res.status(400);

    } else {

  
      const fullUser = await prisma.user.findUnique({
        where: { id: user?.id },
      });
      if (!fullUser) {
        res.status(400);
      }else{      const userLogs = await prisma.userLog.findMany({
        where: { userId: fullUser?.id  },
        include: { workoutLine: { include: { exercise: true } } }
      });
      const sortedUserLogs = userLogs.sort((a: any, b: any) => a.date - b.date);
  
      console.log(sortedUserLogs)
  
      const groupedData = _(sortedUserLogs)
      .groupBy((x) => x.date)
      .entries()
      .map((arr) => {
          console.log({arr})
          return new Date(arr[0])
      });

      res.status(200).json({ data: groupedData });}

    }

  } catch (error) {
    console.log({ error });
    return res.status(500);
  }
}
