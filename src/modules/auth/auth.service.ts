import { PrismaClient } from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { loginType, signUpType } from './dto/auth.dto.js';
import userService, { UserService } from '../user/user.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database.js';

export class AuthService {
  constructor(
    private readonly prismaDBClient: PrismaClient,
    private readonly emailService: EmailService,
    private readonly userService: UserService
  ) {}

  async signup(data: signUpType) {
    const { email } = data;
    const userExist = await this.userService.findByEmail(email);
    if (userExist) {
      throw new Error('NONSTD_USER_EXIST');
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRound);
    const newUser = { ...data, password: hashedPassword };
    const createdUser = await this.prismaDBClient.user.create({
      data: newUser,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const accessToken = await this.generateAccessToken(
      { id: createdUser.id, email: createdUser.email },
      '15m'
    );
    const refreshToken = await this.generateRefreshTokenAndSave(
      { id: createdUser.id, email: createdUser.email },
      '7d'
    );
    //schedule a welcome email to be sent here
    return { accessToken, createdUser, refreshToken };
  }
  async login(data: loginType) {
    const { email, password } = data;
    const locatedUser = await this.userService.findByEmail(email);
    if (!locatedUser) {
      throw new Error('NONSTD_USER_NOT_FOUND');
    }
    if (await bcrypt.compare(password, locatedUser.password)) {
      const accessToken = await this.generateAccessToken(
        { email: locatedUser.email, id: locatedUser.id },
        '1d'
      );

      //save the token to  the database this will be sheduled
      const refreshToken = await this.generateRefreshTokenAndSave(
        { id: locatedUser.id, email: locatedUser.email },
        '7d'
      );

      //schedule a welcome email to be sent here
      return { accessToken, locatedUser, refreshToken };
    }
    throw new Error('NONSTD_USER_NOT_FOUND');
  }
  async refreshToken(token: string) {
    const secret = process['env']['JWT_REFRESH_TOKEN_SECRET']!;
    const payload = jwt.verify(token, secret) as { email: string; id: string };
    const locatedUser = await this.userService.findByEmail(payload.email);

    if (locatedUser) {
      const REFRESH_TOKEN = await this.prismaDBClient.refreshToken.findUnique({
        where: { userId: locatedUser.id },
        select: { token: true, expiresAt: true, revoked: true },
      });
      if (REFRESH_TOKEN) {
        const currentDate = new Date();
        if (
          currentDate < REFRESH_TOKEN['expiresAt'] &&
          !REFRESH_TOKEN['revoked']
        ) {
          const payload = { id: locatedUser.id, email: locatedUser.email };
          const accessToken = await this.generateAccessToken(payload, '10h');
          const refreshToken = await this.generateRefreshTokenAndSave(
            payload,
            '7d'
          );
          return { accessToken, refreshToken };
        }
      }
    }
    throw Error('NONSTD_INVALID_TOKEN');
  }

  async generateAccessToken(
    payload: { email: string; id: string },
    expiresAt: any
  ): Promise<string> {
    const secret = process['env']['JWT_SECRET']!;
    const token = jwt.sign(payload, secret, { expiresIn: expiresAt });
    return token;
  }

  /**
   *
   * @param payload  The payload to add to token
   * @param expiresAt The time to  live for the token(supports only days e.g 2d, 30d etc)
   * @returns token
   */
  async generateRefreshTokenAndSave(
    payload: { email: string; id: string },
    expiresAt: any
  ): Promise<string> {
    const [day, unitofTime] = expiresAt.split('');
    const secret = process['env']['JWT_REFRESH_TOKEN_SECRET']!;
    const token = jwt.sign(payload, secret, { expiresIn: expiresAt });
    const TTL: Date = new Date();
    TTL.setDate(TTL.getDate() + day);
    const saltRound = 10;
    const hashRefreshToken = await bcrypt.hash(token, saltRound);
    const refreshTokenDto = {
      token: hashRefreshToken,
      expiresAt: TTL,
      user: {
        connect: { id: payload.id },
      },
    };
    try {
      await this.prismaDBClient.$transaction([
        this.prismaDBClient.refreshToken.delete({
          where: { userId: payload.id },
        }),
        this.prismaDBClient.refreshToken.create({
          data: refreshTokenDto,
        }),
      ]);
    } catch (error: any) {
      if (error.code === 'P2025') {
        await this.prismaDBClient.refreshToken.create({
          data: refreshTokenDto,
        });
      }
    }
    return token;
  }
}
export default new AuthService(prisma, emailService, userService);
