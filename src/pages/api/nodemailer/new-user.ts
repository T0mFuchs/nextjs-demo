import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
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
            <div style="padding: 2em">
              <h2>Welcome, ${name} 👋</h2>
              <p>
                <span>🔗: </span>
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
};

export default handler;
