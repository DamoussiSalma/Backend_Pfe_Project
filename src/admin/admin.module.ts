import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AdminService],
})
export class AdminModule implements OnApplicationBootstrap{

  constructor(private readonly seedService: AdminService) {}
  async onApplicationBootstrap()  {
    await this.seedService.seedAdmin();
  }
}
