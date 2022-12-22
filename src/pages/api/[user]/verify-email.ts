import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import User from "models/user";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const user = req.query.user;
      await mongooseConnect();
      const userFromDB = await User.findOne({ _id: user });
      if (!userFromDB.emailVerified) {
        await User.updateOne(
          { _id: user, email: session.user?.email },
          { emailVerified: true }
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end();
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "json");
        res.end({ message: "email already verified" });
      }
    }
  }
};

export default handler;
