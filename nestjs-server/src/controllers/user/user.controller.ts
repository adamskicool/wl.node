import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
import {
  UserLoginBody,
  UserLoginResponse,
  UserSignupBody,
  UserSignupResponse,
} from '../../types';
import { hash, compare as compareHash } from 'bcrypt';
import { sign as signJWT } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

@Controller('/user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  @Post('/login')
  async login(
    @Body()
    { username, password }: UserLoginBody,
  ): Promise<UserLoginResponse> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    const match: boolean = await compareHash(password, user.password);
    if (!match) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const token: string = await this.signToken(user.id);
    return { token };
  }

  @Post('/signup')
  async signup(
    @Body()
    { username, password, email }: UserSignupBody,
  ): Promise<UserSignupResponse> {
    const saltRounds: number = parseInt(process.env.SALT_ROUNDS);
    const passwordHash: string = await hash(password, saltRounds);
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }
    const { id: userId }: User = await this.prismaService.user.create({
      data: {
        id: uuid(), //TODO: Prisma should do this for us. Try using uuid() in the schema.prisma file.
        username,
        password: passwordHash,
        email,
      },
    });
    const token: string = await this.signToken(userId);
    return { token };
  }

  async signToken(userId: string): Promise<string> {
    const token = await signJWT(
      {
        userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, //process.env.DEGUB ? '24h' : process.env.JWT_TOKEN_LIFETIME}
    );
    return token;
  }
}
