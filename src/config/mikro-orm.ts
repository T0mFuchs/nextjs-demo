import { Options, ReflectMetadataProvider } from "@mikro-orm/core"
import { Post } from "../entities"

const options: Options = {
  type: "mongo",
  entities: [Post],
  clientUrl: process.env.MONGO_URL,
  metadataProvider: ReflectMetadataProvider,
  debug: true, // * enable/disable logger * //
}

export default options
