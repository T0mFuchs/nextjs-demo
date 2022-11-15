import prisma from "../../../lib/prisma";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400);
  }
  await prisma.post.create({ data: { title, body } });
  res.statusCode = 200;
  res.end();
};

export default handler;
