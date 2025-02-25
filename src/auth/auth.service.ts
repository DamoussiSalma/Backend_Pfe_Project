import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/type/role';
@Injectable()
export class AuthService {

    constructor (
        @InjectModel(User.name)
        private userModel :Model<User>,
        private jwtService: JwtService,
    ){}

    async signUp (signUpDto : SignUpDto): Promise<{ token: string }>{
        const { name, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.userModel.create({
          role:Role.User,
          name,
          email,
          password: hashedPassword,
        });
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
           throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }

      async getuserProfile (user : User):Promise<User>{
        const User = await this.userModel.findById(user._id);
        return User ;
    }

}
