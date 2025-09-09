import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { password as bunPassword } from 'bun';
import pg from 'pg';

const dbUrl = process.env.DATABASE_URL;
const username = process.env.ADMIN_USER;
const password = process.env.ADMIN_PASS;

if (!dbUrl || !username || !password) {
  console.error('No `database url` | `admin username` | `admin password` found in ENV');
  process.exit();
}

const pool = new pg.Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool.options);
const prisma = new PrismaClient({ adapter });

async function seeder() {
  const hashedPassword = await bunPassword.hash(password || '');

  await prisma.user.create({
    data: {
      username: username || '',
      password: hashedPassword,
    },
  });
}

seeder()
  .then(async () => {
    console.log('successfully add seed the database');
  })
  .catch(async (err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit();
  });
