import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    // secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    pages: {
      newUser: "/signup",
    },
  });

//  debug: process.env.NODE_ENV !== "development",
//   secret: process.env.AUTH_SECRET,
//   jwt: {
//       secret: process.env.JWT_SECRET,
//   }
