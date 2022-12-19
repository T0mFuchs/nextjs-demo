import { NextApiHandler, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import mongooseConnect from "lib/mongoose-connect";
import User from "models/user";
import Entry from "models/entry";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      await mongooseConnect();
      const sort_key: any = req.query.sort_key as string;
      const sort_value: any = req.query.sort_value as string;
      const user = await User.findOne({ email: session.user?.email });
      const entries = await Entry.find({
        visibility: false,
        author: user._id,
      }).sort({ [sort_key]: sort_value });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(entries));
    }
  }
};

export default handler;
