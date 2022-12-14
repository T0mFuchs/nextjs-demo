import { ObjectId } from "mongodb";

export type Session = {
  _id: ObjectId;
  sessionToken: string;
  userId: ObjectId;
  expires: Date;
};
