import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import nodemailer from "nodemailer";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const { email, name } = req.body;
      if (!email || !name) {
        return res.status(400).json({ message: "Bad request" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: `New user login. Hello, ${name} 👋`,
          html: `
            <div style="padding: 2em; box-shadow: #30234d15 0 1em 2.3em -1em, #00000080 0 1.5em 2em -1.5em;">
              <h2>Welcome, ${name} 👋</h2>
              <p>
                <span>🌐: </span>
                <a href="${process.env.NEXTAUTH_URL}">${process.env.NEXTAUTH_URL}</a>
              </p>
              <b style="color: #707070">sent with nodemailer</b>
            </div>
          `,
        });
        res.statusCode = 200;
        res.end();
      } catch (e) {
        console.error(e);
      }
    }
  }
};

export default handler;
