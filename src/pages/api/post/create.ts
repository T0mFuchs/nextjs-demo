import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../entities";
import { getEM, withORM } from "../../../utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res
      .status(400)
      .json({ success: false, message: "bad request" });
  }
  try {
    const em = getEM();
    const post = new Post(title, body);
    await em.persistAndFlush(post);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.status(200).json({ title: `${title}`, body: `${body}` });
  } catch (e) {
    return res.status(400).json({ success: false, message: e });
  }
};

export default withORM(handler);
