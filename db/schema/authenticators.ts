import {
  integer,
  pgTable,
  text,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const authenticators = pgTable(
  "authenticator",
  {
    credential_id: text("credential_id").notNull().unique(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider_account_id: text("provider_account_id").notNull(),
    credential_public_key: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credential_device_type: text("credential_device_type").notNull(),
    credential_backed_up: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.user_id, authenticator.credential_id],
    }),
  })
);
