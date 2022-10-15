import { NextApiHandler } from "next"
import "reflect-metadata"
import { Post } from "../../../entities"
import getEM from "../../../utils/getEM"
import withORM from "../../../utils/withORM"

const handler: NextApiHandler = async (req, res) => {
  const { id }: any = req.query.id
  const em = getEM()             // @ts-ignore
  const post = await em.findOne(Post, { id: id })
  console.log(post) // is null // todo should be a object

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(post))
}

export default withORM(handler)
