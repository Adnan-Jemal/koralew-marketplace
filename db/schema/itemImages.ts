import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { items } from "./items";

// item_images table
export const itemImages = pgTable("item_image", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export type InsertItemImages = typeof itemImages.$inferInsert;
export type SelectItemImages = typeof itemImages.$inferSelect;
