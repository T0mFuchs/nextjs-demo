import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { Entry } from "entities";

const options: Options = {
  type: "mongo",
  entities: [Entry],
  clientUrl: process.env.MONGO_URL,
  metadataProvider: ReflectMetadataProvider,
  debug: process.env.NODE_ENV === "production" ? false : true,
};

export default options;
