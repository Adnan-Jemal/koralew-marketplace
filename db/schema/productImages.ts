import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { products } from "./products";

// product_images table
export const productImages = pgTable('product_images', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').notNull().references(() => products.id), 
    imageUrl: text('image_url').notNull(),  
    order: integer('order').notNull(),
  });

export type InsertProductImages = typeof productImages.$inferInsert;
export type SelectProductImages = typeof productImages.$inferSelect;
