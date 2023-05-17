import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ nullable: false })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ nullable: false })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ nullable: false })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 30, { message: 'password has to be between 7 and 30 chars' })
  @ApiProperty({ nullable: false, minLength: 7, maxLength: 30 })
  password: string;
}
