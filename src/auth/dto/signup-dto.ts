import { IsEmail, IsNotEmpty, IsString, MinLength,IsOptional } from 'class-validator';
import { Role } from 'src/type/role';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
   role : Role;
}