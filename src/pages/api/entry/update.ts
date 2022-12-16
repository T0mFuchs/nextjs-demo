import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import mongooseConnect from "lib/mongoose-connect";
import Entry from "models/entry";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const session = await unstable_getServerSession(req, res, authOptions);
    const regex = new RegExp("^([^s]*[w]*(?:S+s[^s]))*[^s]*$");
    if (session) {
      const { _id, title, body, visibility, author } = req.body;
      if (!_id || !title || (!body && regex.test(title))) {
        return res.status(400);
      }
      await mongooseConnect();
      await Entry.findOneAndUpdate(
        { _id: _id, author: author },
        { title: title, body: body, visibility: visibility, updatedAt: new ObjectId() },
        () => {
          res.statusCode = 200;
          res.end();
        }
      );
    }
  }
};

export default handler;
