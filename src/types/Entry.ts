import { ObjectId } from "mongodb";

export type Entry = {
  _id: ObjectId;
  title: string;
  body: string;
};
