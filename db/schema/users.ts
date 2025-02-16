import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  address: text("address"),
  phoneNumber: text("phone_number"),
  region: text("region"),
  city: text("city"),
  email: text("email").notNull().unique(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
