import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../entities";
import { getEM, withORM } from "../../../utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400);
  }
  const em = getEM();
  em.nativeInsert(Post, { title, body });
  await em.flush();
  res.status(200).end();
};

export default withORM(handler);
