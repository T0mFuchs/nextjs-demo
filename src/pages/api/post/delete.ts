import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../entities";
import { getEM, withORM } from "../../../utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400);
  }
  const em = getEM();
  em.nativeDelete(Post, id);
  await em.flush();
  res.status(200).end();
};

export default withORM(handler);
