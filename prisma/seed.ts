import { prisma } from '../src/config/database.js';

async function seedUser(): Promise<void> {
  
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

// main();
