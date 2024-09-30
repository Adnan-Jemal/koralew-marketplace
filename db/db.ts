// import { drizzle } from 'drizzle-orm/neon-http';
// import { neon } from '@neondatabase/serverless';

// export const db = drizzle(neon(process.env.DATABASE_URL!!));

import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool)

