import { NextApiHandler } from "next"
import "reflect-metadata"
import { Post } from "../../../entities"
import getEM from "../../../utils/getEM"
import withORM from "../../../utils/withORM"

const handler: NextApiHandler = async (req, res) => {
  const em = getEM()
  const posts = await em.find(Post, {})

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(posts))
}

export default withORM(handler)
