import {Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  mongoose from 'mongoose';
import {User} from './schemas/user.schema'

@Injectable()
export class UserService {

    constructor (
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,

    ) {}

    async findAllUsers(): Promise<User[]>{
        const Users = await this.userModel.find({role:"user"});
        return Users ;
    }


   /* async createUser(user:User):Promise<User>{
        const email = user.email;
        
        const userexist= await this.userModel.findOne({email})
        if(userexist){
            throw new Error('user already exists')
        }
            const res = await this.userModel.create(user)
            return res ;
        
        
    }*/

    async findUserById(id : string): Promise<User>{
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new NotFoundException('user data not found!');
        }
        
        return user ;
    }

    /*async UpdateUserById(id : string, user : User): Promise<User>{
       return await this.userModel.findByIdAndUpdate(id,user,{
            new : true,
            runValidators: true,
        });
    }*/

    async deleteUser (id : string) :Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async getcurrentUser (user : User){
        return await this.userModel.findById(user._id);
    } 

    async GetUserInfo (id: string): Promise<User>{
        const userInfo = await this.userModel.findById(id);
        return userInfo;
    }
}
