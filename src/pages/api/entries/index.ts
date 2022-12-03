import "reflect-metadata";
import { NextApiHandler, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const em = getEM();
  const data = await em.find(Entry, {}, {});

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

export default withORM(handler);
