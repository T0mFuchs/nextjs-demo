import "reflect-metadata";
import { NextApiHandler, NextApiResponse } from "next";
import { getEM, withORM } from "../../../lib";
import { Post } from "../../../entities";

// make it fetch 10 by default then implement refetching with intersection observer

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const em = getEM();
  const posts = await em.find(Post, {}, { limit: 20 });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(posts));
};

export default withORM(handler);
