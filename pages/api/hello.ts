// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data:{
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      password: "password",
      gender: false,
      age: 12,
      weight: 12,
      height: 12,
    }
  });
  res.status(200).json({ name: "John Doe" });
}
