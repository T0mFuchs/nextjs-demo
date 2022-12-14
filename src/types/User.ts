import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: true | null;
  visibility: boolean;
};
