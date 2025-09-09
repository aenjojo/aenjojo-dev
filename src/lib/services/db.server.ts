import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { log } from './log.server';

function prismaInit() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    log.fatal('env DATABASE_URL may not exist or empty');
    process.exit();
  }

  const pool = new pg.Pool({
    connectionString: dbUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 150,
    idleTimeoutMillis: 3_600_000,
  });
  const adapter = new PrismaPg(pool.options);
  const prisma = new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 15000,
      timeout: 15000,
    },
  });

  return prisma;
}

export const db = prismaInit();
