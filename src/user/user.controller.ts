import { Controller, Get, Post,Body, Param, Delete,Put, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequireRoles } from 'src/decorateur/role.decorateur';
import { Role } from 'src/type/role';
import { RolesGuard } from 'src/gard/role.guard';

@Controller('user')
export class UserController {

    constructor (private userService: UserService){}

    @Get('/all')
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    async getAllUsers(): Promise <User[]>{
    try{
        const users=await this.userService.findAllUsers();
        return users
    }catch (err)
    {console.log(err)}
    
}
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    @Get(':id')
    async getOneUser(@Param() id : string): Promise <User>{
        console.log(id)
        return this.userService.findUserById(id);
    }

    

    /*@Post('/newUser')
    async createUser(@Body()user : CreateUserDto): Promise<User> {
        return this.userService.createUser(user);

    } 
    @Put(':id')
    async updateUser(@Param() id :string,@Body()user :UpdateUserDto): Promise <User>{
        return this.userService.UpdateUserById(id,user)
     }
    */

   
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    @Delete(':id')
    @RequireRoles(Role.Admin)
    async deleteOneUser(@Param() id : string): Promise <User>{
        return this.userService.deleteUser(id);
    }

    @Get('/userInfo/:id')
    async UserInfo (@Param() id : string): Promise <User>{
        return this.userService.GetUserInfo(id);
    }
    

}
