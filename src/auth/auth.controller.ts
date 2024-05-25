import { Body, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/type/role';
import { response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {

      signUpDto.role= Role.User
      return this.authService.signUp(signUpDto);
    }
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
      try{
        return this.authService.login(loginDto);


      }
      catch(err){console.log(err)}
      
    }

    @Get('/profile')
    @UseGuards(AuthGuard())
    async getUserById(@Req() req): Promise <User>{
        return this.authService.getuserProfile(req.user);
    }
}
