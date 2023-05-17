import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ nullable: false })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 30, { message: 'Password has to be between 7 and 30 chars' })
  @ApiProperty({ nullable: false, minLength: 7, maxLength: 30 })
  password: string;
}
