import { Pool, QueryResultRow } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
  }

  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return pool;
}

export async function query<T extends QueryResultRow = any>(text: string, params?: Array<unknown>): Promise<T[]> {
  const p = getPool();
  const result = await p.query<T>(text, params);
  return result.rows;
}
