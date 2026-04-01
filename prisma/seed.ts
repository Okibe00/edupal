import { prisma } from '../src/config/database.js';

async function seedUser(): Promise<void> {
  const users = [{ name: 'Okibe Onmeje' }, { name: 'Marvins Ogaraku' }];
  await prisma.user.createMany({ data: users });
  return;
}
async function main(): Promise<void> {
  try {
    await seedUser();
  } catch (error: any) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
