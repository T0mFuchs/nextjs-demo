import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "../../../lib";
import { Post } from "../../../entities";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title } = req.query;
  const em = getEM();
  const post = await em.findOne(Post, { title });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(post));
};

export default withORM(handler);
