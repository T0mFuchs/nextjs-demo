import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "../../../lib";
import { Post } from "../../../entities";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400);
  }
  const em = getEM();
  await em.nativeDelete(Post, { id, title });
  res.statusCode = 200;
  res.end();
};

export default withORM(handler);
