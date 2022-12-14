import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Entry from "models/entry";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const { _id, title } = req.body;
      if (!_id || !title) {
        return res.status(400);
      }
      await mongooseConnect();
      await Entry.findByIdAndDelete({ _id: _id });
      res.statusCode = 200;
      res.end();
    }
  }
};

export default handler;
