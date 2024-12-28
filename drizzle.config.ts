
import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
    path: '.env.local',
  });

export default defineConfig({
  schema: "./db/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
