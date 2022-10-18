import "reflect-metadata"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { Post } from "../../../entities"
import getEM from "../../../utils/getEM"
import withORM from "../../../utils/withORM"

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // todo :: query returns   [object Object]   ?!?!?!
  const id = req.query["id"]
  console.log("return toString(): ", id?.toString())
  console.log("typeof return: ", typeof id)

  const em = getEM() // @ts-ignore
  const post = await em.findOne(Post, { id: "630bd8a4f9794fa73b78ecf1" })

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(post))
}

export default withORM(handler)
