import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const { title, body } = req.body;
      if (!title || !body) {
        return res.status(400);
      }
      const em = getEM();
      em.create(Entry, { title, body });
      await em.flush();
      res.statusCode = 200;
      res.end();
    }
  }
};

export default withORM(handler);
