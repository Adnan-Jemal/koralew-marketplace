import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";


export const favorites = pgTable("favorites", {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), 
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }), 
    createdAt: timestamp("created_at").defaultNow(), 
  }, (table) => ({
    pk: primaryKey(table.userId, table.productId), 
  }));