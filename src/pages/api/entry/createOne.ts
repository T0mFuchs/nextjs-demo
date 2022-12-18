import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import mongooseConnect from "lib/mongoose-connect";
import Entry from "models/entry";
import { ObjectId } from "mongodb";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const { title, body, visibility, author } = req.body;
      if (!title || !body || visibility === undefined || !author) {
        return res.status(400);
      }
      await mongooseConnect();
      const entry = new Entry({
        title: title,
        body: body,
        visibility: visibility,
        author: author,
        updatedAt: new ObjectId(),
      });
      await entry.save().then(() => {
        res.statusCode = 200;
        res.end();
      });
    }
  }
};

export default handler;
