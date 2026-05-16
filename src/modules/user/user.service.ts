import { threadId } from 'node:worker_threads';
import {
  PrismaClient,
  User,
  UserRole,
} from '../../../generated/prisma/client.js';
import { prisma } from '../../config/database.js';

export class UserService {
  constructor(private readonly prismaDBClient: PrismaClient) {}

  async findByEmail(email: string) {
    return await this.prismaDBClient.user.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async findById(id: string) {
    return await this.prismaDBClient.user.findUnique({
      where: { id },
      include: { role: { select: { id: true, name: true } } },
    });
  }
  async fetchRole(userId: string) {
    return await this.prismaDBClient.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
  }
  async fetchRoleAndPermission(userId: string) {
    const user = await this.prismaDBClient.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            rolePermissions: { include: { permission: true, role: true } },
          },
        },
      },
    });
    const filteredSearch = user?.role?.rolePermissions[0];
    const rolePerm = {
      role: filteredSearch?.role,
      permission: filteredSearch?.permission,
    };
    return rolePerm;
  }
  async delete(email: string): Promise<User> {
    return await this.prismaDBClient.user.delete({
      where: { email },
    });
  }
}

export default new UserService(prisma);
