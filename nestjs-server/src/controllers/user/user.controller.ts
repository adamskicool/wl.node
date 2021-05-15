import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserController {
  constructor() {}

  @Post('/login')
  async login(
    @Body()
    body: any, //TODO: add login body interface
  ): Promise<any> {
    console.log(body);
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
