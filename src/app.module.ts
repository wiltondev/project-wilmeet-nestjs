/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { MeetModule } from './meet/meet.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    UserModule,
    AuthModule,
    MeetModule

  ],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }
