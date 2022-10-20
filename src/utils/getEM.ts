import { RequestContext } from "@mikro-orm/core";

export { getEM };

const getEM = () => {
  const em = RequestContext.getEntityManager();
  if (!em)
    throw new Error(
      " [getORM.ts]: em not found. are you within a 'withORM'-wrapped context? "
    );
  return em;
};


