import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument,User } from 'src/user/schemas/user.schema';
import  * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {

    constructor(@InjectModel(User.name) private readonly adminModel: Model<UserDocument>) {}

    async seedAdmin() {
      const existingAdmin = await this.adminModel.findOne({ email: 'admin@gmail.com' });
      if (!existingAdmin) {
        const admin = new this.adminModel({ email: 'admin@gmail.com',
         password:await bcrypt.hash ('123456',10),
        role: 'admin'});
        await admin.save();
      }
    }
}
