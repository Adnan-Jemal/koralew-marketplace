import { integer, pgTable, serial, text, timestamp,decimal, boolean } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  address: text('address').notNull(),
  region: text('region'),
  country: text('country').notNull(),
  city: text('address').notNull(),
  email: text('email').notNull().unique(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const productsTable = pgTable('products_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  price: decimal('price',{ precision: 10, scale: 2 }).notNull(),
  priceNegotiable: boolean('price_negotiable').default(true),
  views: integer('views').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;