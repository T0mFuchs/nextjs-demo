import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const limit: number = parseInt(req.query.limit as string);
  const em = getEM();
  const data = await em.find(Entry, {}, { limit: limit });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

export default withORM(handler);
