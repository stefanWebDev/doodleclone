// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      //   saveUser(req.body);
    } catch (err) {
      console.log(err);
    }
  }
}

async function saveDateData(dateData: any) {
  const prisma = new PrismaClient();
 await prisma.date.create({
    data: {
      posts: {
        create: [
          { title: 'Prisma Day 2020' }, // Populates authorId with user's id
          { title: 'How to write a Prisma schema' }, // Populates authorId with user's id
        ],
      },
    },
  })
}
