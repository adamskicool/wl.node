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

@Controller()
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  @Post('/login')
  async login(
    @Body()
    { username, password }: any, //TODO: add login body interface
  ): Promise<any> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //   throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    // }
    console.log(user);
    return '/login';
  }

  @Post('/signup')
  async signup(
    @Body()
    body: any, //TODO: add signup body interface
  ): Promise<any> {
    console.log(body);
    return '/signup';
  }
}
