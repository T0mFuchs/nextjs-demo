import "reflect-metadata";
import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Post } from "../../../entities";
import getEM from "../../../utils/getEM";
import withORM from "../../../utils/withORM";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // todo :: query returns   [object Object]   ?!?!?!
  const { id } = req.query
  console.log(id)
  console.log("id: ", id, "typeof id: ", typeof id)

  const em = getEM(); // @ts-ignore
  const post = await em.findOne(Post, { id: id });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(post));
};

export default withORM(handler);
