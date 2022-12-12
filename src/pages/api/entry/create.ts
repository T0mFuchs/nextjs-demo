import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getEM, withORM } from "lib";
import { Entry } from "entities";
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const token = await getToken({ req });
    const regex = new RegExp("^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s]*$");
    if (token) {
      const { title, body } = req.body;
      if (!title || !body && regex.test(title)) {
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
