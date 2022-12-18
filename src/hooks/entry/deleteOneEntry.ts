import { ObjectId } from "mongodb";

type Entry = {
  _id: ObjectId;
  author: ObjectId;
};

export async function useDeleteOneEntry(entry: Entry) {
  await fetch("/api/entry/deleteOne", {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
