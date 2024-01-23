/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { MessagesHelper } from './helper/messages.helper';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/messages.helper';
import { JwtService } from '@nestjs/jwt';

// A anotação @Injectable indica que esta classe pode ser injetada em outras classes pelo sistema de injeção de dependências do NestJS.
@Injectable()

// AuthService é a classe que lida com a autenticação do usuário.
export class AuthService {
  // logger é uma instância de Logger que é usada para registrar mensagens de depuração.
  private logger = new Logger(AuthService.name);

  // O construtor recebe duas dependências: UserService e JwtService.
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  // Método assíncrono para realizar o login de um usuário.
  async login(dto: LoginDto) {
    // Registra no log que o processo de login começou.
    this.logger.debug('login - started');

    // Busca o usuário pelo login e senha fornecidos.
    const user = await this.userService.getUserByLoginPassword(dto.login, dto.password);
    // Se o usuário não for encontrado, lança uma exceção de BadRequest.
    if (user == null) {
      throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_LOGIN_OR_NOT_FOUND);
    }

    // Prepara os dados do usuário para serem usados na geração do token JWT.
    const tokenPayload = {
      email: user.email,
      sub: user._id,
    }

    // Retorna um objeto contendo o e-mail, nome e token do usuário.
    return {
      email: user.email,
      name: user.name,
      token: this.jwtService.sign(tokenPayload, { secret: process.env.USER_JWT_SECRET_KEY })
    }
  }

  // Método assíncrono para registrar um novo usuário.
  async register(dto: RegisterDto) {
    // Registra no log que o processo de registro começou.
    this.logger.debug('register - started');
    // Verifica se já existe um usuário com o mesmo e-mail fornecido.
    if (await this.userService.existsByEmail(dto.email)) {
      // Se existir, lança uma exceção de BadRequest.
      throw new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT);
    }

    // Cria um novo usuário com os dados fornecidos.
    await this.userService.create(dto);
  }
}