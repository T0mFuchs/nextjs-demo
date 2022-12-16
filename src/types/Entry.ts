import { ObjectId } from "mongodb";

export type EntryType = {
  _id: ObjectId;
  title: string;
  body: string;
  visibility: boolean;
  author: ObjectId;
  updatedAt: ObjectId;
};
