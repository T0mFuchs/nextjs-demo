// @ts-nocheck
import prisma from "../../../lib/prisma";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title } = req.query;
  const post = await prisma.post.findUnique({ where: { title } });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(post));
};

export default handler;
