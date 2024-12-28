import { integer, pgTable, serial, text, timestamp,decimal, pgEnum } from 'drizzle-orm/pg-core';
import {users} from "./users"


export const conditionEnum = pgEnum('condition', ["New", "Slightly Used", "Used", "Refurbished"]);

export const products = pgTable('product', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  condition: conditionEnum('condition').notNull(),
  price: decimal('price',{ precision: 10, scale: 2 }).notNull(),
  views: integer('views').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;