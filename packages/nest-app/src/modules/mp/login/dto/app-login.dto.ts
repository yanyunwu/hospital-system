import { IsString, IsNotEmpty } from 'class-validator';

export class AppLoginDto {
  @IsString()
  stuID: string;

  @IsString()
  password: string;
}
