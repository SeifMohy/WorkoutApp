import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  //todo: add auth support

  switch (req.method) {
    case "POST":
      createUser(req, res);
      break;
    case "GET":
      getUserId(req, res);
      break;
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
 // console.log(req, res);
  try {
    const { user } = await getUser({ req, res });
    const { weight, height, age, gender } = req.body;
    console.log(req.body);
    console.log(user);

    const exists = await prisma.user.findFirst({where: {id : user?.id}})

    if(exists){
      //can update the users data with new info
      return res.status(200).json({msg: "here is the user", exists})
    }

    const data = user?.user_metadata;
    const newUser = await prisma.user.create({
      data: {
        id: user?.id!,
        email: user?.email,
        image: data?.avatar_url,
        name: data?.name,
        weight: +weight,
        age: +age,
        height: +height,
        gender: gender,
      },
    });

    res.status(200).json({ msg: "user info created", newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "something went wrong", details: err });
  }
}

async function getUserId(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser({ req, res });
  console.log(user);
  if (user) {
    // Signed in
    try {
      const userId = user?.id;
      const fullUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!fullUser) {
        return res.status(400).json({ msg: "no user" });
      }
      return res.status(200).json({ msg: "user info", fullUser });
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ msg: "something went wrong", err });
    }
  } else {
    // Not Signed in
    console.log("User Redirected");

    return res.writeHead(403, {
      Location: "/signup",
    });
  }
}
