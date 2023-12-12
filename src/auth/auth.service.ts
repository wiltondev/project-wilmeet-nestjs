/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { MessagesHelper } from './helper/messages.helper';

@Injectable()

export class AuthService {
  login(dto: LoginDto) {
    if (dto.login !== 'teste@teste.com' || dto.password !== 'teste@123') {
      throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_LOGIN_OR_NOT_FOUND);
    }

    return dto;
  }
}
