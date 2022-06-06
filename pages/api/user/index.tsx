import { PrismaClient, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
const prisma = new PrismaClient()

export default async function handle(req:NextApiRequest, res:NextApiResponse) {

  //todo: add auth support

  switch (req.method) {
    case 'PUT':
      updateUserInfo(req, res)
      break
      case 'GET':
        getUserByEmail(req, res)
        break
  }
}


async function updateUserInfo(req: NextApiRequest, res:NextApiResponse) {
    try {
        const session= await getSession({req})
      const userEmail = session?.user?.email
      const { weight, height, age, gender } =req.body
      console.log(req.body)

      const updateUserInfo = await prisma.user.updateMany({

        where: { email: userEmail},
        data: {
          weight:+weight,
          age:+age,
          height:+height,
          gender,
        },
      })
        
      res.status(200).json({ msg: 'user info updated', updateUserInfo })
    } catch (err) {
        console.log(err)
      res.status(400).json({ msg: 'something went wrong', details: err })
    }
}
  
async function getUserByEmail(req: NextApiRequest, res: NextApiResponse) {
  
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
  }
