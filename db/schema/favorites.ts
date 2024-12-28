import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";


export const favorites = pgTable("favorites", {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }), // Foreign key to products
    createdAt: timestamp("created_at").defaultNow(), // Automatically sets the timestamp
  }, (table) => ({
    pk: primaryKey(table.userId, table.productId), // Composite primary key
  }));