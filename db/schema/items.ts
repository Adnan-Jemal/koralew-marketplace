import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const conditionEnum = pgEnum("condition", [
  "New",
  "Slightly Used",
  "Used",
  "Refurbished",
]);

export const statusEnum = pgEnum("status", [
  "Active",
  "Under Review",
  "Rejected",
  "Sold",
  "Removed",
]);

export const items = pgTable("item", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  condition: conditionEnum("condition").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  views: integer("views").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: statusEnum("status").notNull().default("Active"),
});

export type InsertItem = typeof items.$inferInsert;
export type SelectItem = typeof items.$inferSelect;
