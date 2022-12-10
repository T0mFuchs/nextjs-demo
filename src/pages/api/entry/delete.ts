import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400);
  }
  const em = getEM();
  await em.nativeDelete(Entry, { id, title });
  res.statusCode = 200;
  res.end();
  }
};

export default withORM(handler);
