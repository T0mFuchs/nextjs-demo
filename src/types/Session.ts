import { ObjectId } from "mongodb";

export type SessionType = {
  _id: ObjectId;
  sessionToken: string;
  userId: ObjectId;
  expires: Date;
};
