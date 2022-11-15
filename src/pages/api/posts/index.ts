import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiResponse } from "next";

const prisma = new PrismaClient();

// make it fetch 10 by default then implement refetching with intersection observer

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const posts = await prisma.post.findMany();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(posts));
};

export default handler;
