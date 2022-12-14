import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Entry from "models/entry";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    const regex = new RegExp("^([^s]*[w]*(?:S+s[^s]))*[^s]*$");
    if (session) {
      const { title, body } = req.body;
      if (!title || (!body && regex.test(title))) {
        return res.status(400);
      }
      await mongooseConnect();
      const entry = new Entry({ title, body });
      await entry.save().then(() => {
        res.statusCode = 200;
        res.end();
      });
    }
  }
};

export default handler;
