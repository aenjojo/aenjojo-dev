import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  experimental: {
    adapter: true,
  },
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'bun run ./prisma/seed.ts',
  },
  typedSql: {
    path: './prisma/queries',
  },
});
