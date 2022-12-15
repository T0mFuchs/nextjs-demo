import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Entry from "models/entry";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const skip: number = parseInt(req.query.skip as string);
    const limit: number = parseInt(req.query.limit as string);
    const sort: any = parseInt(req.query.sort as string); //  -1 = descending, 1 = ascending
    await mongooseConnect();
    const entries = await Entry.find({ visibility: true })
      .skip(skip)
      .limit(limit)
      .sort({ _id: sort });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(entries));
  }
};

export default handler;
