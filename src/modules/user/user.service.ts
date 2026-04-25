import { PrismaClient, User } from '../../../generated/prisma/client.js';
import { prisma } from '../../config/database.js';

export class UserService {
  constructor(private readonly prismaDBClient: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaDBClient.user.findUnique({
      where: { email },
    });
  }

  async getUserRole() {}
  async getUserPermision() {}
}

export default new UserService(prisma);
