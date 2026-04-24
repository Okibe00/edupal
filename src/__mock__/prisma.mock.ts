import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '../../generated/prisma/client.js';
export const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
