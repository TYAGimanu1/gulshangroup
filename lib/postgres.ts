import { Pool, QueryResultRow } from 'pg';

const globalWithPg = globalThis as typeof globalThis & {
  __pgPool?: Pool;
};

function getPool(): Pool {
  if (globalWithPg.__pgPool) return globalWithPg.__pgPool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  globalWithPg.__pgPool = pool;
  return pool;
}

export async function query<T extends QueryResultRow = any>(text: string, params?: Array<unknown>): Promise<T[]> {
  const pool = getPool();
  const result = await pool.query<T>(text, params);
  return result.rows;
}
