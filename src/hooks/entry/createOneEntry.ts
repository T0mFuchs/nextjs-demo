import { ObjectId } from "mongodb";

type Entry = {
  title: string;
  body: string;
  visibility: boolean;
  author: ObjectId;
};

export async function useCreateOneEntry(entry: Entry) {
  await fetch(`/api/entry/createOne`, {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
