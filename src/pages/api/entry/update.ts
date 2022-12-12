import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const token = await getToken({ req });
    if (token) {
      const { id, title, body } = req.body;
      if (!id || !title || !body) {
        return res.status(400);
      }
      const em = getEM();
      await em.nativeUpdate(Entry, id, { title, body });
      res.statusCode = 200;
      res.end();
    }
  }
};

export default withORM(handler);
