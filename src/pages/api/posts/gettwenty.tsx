import "reflect-metadata";
import { NextApiHandler, NextApiResponse } from "next";
import { Post } from "../../../entities";
import { getEM, withORM } from "../../../utils";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const em = getEM();
  const posts = await em.find(Post, {}, { limit: 20 });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(posts));
};

export default withORM(handler);
