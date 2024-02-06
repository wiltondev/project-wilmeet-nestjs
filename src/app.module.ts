/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
