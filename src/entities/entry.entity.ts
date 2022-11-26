import { PrimaryKey, Property, Entity } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Entry {
  @PrimaryKey({ type: "ObjectId" })
  _id!: ObjectId;

  @Property({ type: "string", unique: true })
  title: string;

  @Property({ type: "string" })
  body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}