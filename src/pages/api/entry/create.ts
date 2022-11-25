import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "../../../lib";
import { Entry } from "../../../entities";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400);
  }
  const em = getEM();
  em.create(Entry, { title, body });
  await em.flush();
  res.statusCode = 200;
  res.end();
};

export default withORM(handler);
