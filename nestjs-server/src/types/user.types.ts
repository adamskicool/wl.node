import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UserLoginBody {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}

export class UserLoginResponse {
  @IsDefined()
  @IsString()
  token: string;
}

export class UserSignupBody extends UserLoginBody {
  @IsDefined()
  @IsEmail()
  email: string;
}

export class UserSignupResponse extends UserLoginResponse {}
