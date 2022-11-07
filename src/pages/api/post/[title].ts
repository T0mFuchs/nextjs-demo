import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../entities";
import { getEM, withORM } from "../../../utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title } = req.query;
  const em = getEM(); // @ts-ignore
  const post = await em.findOne(Post, { title: title });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(post));
};

export default withORM(handler);
