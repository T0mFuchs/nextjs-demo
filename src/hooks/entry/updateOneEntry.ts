import { ObjectId } from "mongodb";

type Entry = {
  _id: ObjectId;
  title: string;
  body: string;
  visibility: boolean;
  author: ObjectId;
};

export async function useUpdateOneEntry(entry: Entry) {
  await fetch("/api/entry/updateOne", {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}
