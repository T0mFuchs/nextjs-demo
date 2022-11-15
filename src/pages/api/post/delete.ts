import prisma from "../../../lib/prisma";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400);
  }
 await prisma.post.delete({ where: { id } });
  res.statusCode = 200;
  res.end();
};

export default handler;
