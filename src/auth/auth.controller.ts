/* eslint-disable prettier/prettier */
// Esta linha desativa as regras do Prettier para este arquivo. O Prettier é uma ferramenta de formatação de código.

import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
// Importando decoradores de @nestjs/common:
// Controller: Define uma classe como um controlador com um caminho específico para lidar com requisições HTTP.
// Post: Decorador que mapeia métodos HTTP POST para funções específicas do controlador.
// HttpCode: Decorador que define o código de status HTTP para a resposta.
// HttpStatus: Enum que contém os códigos de status HTTP para uso com o decorador HttpCode.
// Body: Decorador que extrai e popula o parâmetro com o corpo da requisição.

import { AuthService } from './auth.service';
// Importando a classe AuthService, que contém a lógica de negócios para autenticação.

import { LoginDto } from './dtos/login.dto';
// Importando o Data Transfer Object (DTO) para o login, que valida e transporta os dados de login do usuário.

import { RegisterDto } from 'src/user/dtos/register.dto';
// Importando o DTO para o registro, que valida e transporta os dados de registro do usuário.

@Controller('auth')
// Decorador que marca a classe como um controlador, onde 'auth' é o caminho base para as rotas definidas abaixo.

export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // Injetando a classe AuthService no controlador para lidar com a lógica de autenticação.

    @Post('login')
    // Mapeia a rota 'POST /auth/login' para este método.
    @HttpCode(HttpStatus.OK)
    // Define que o código de status HTTP para a resposta será 200 OK.
    login(@Body() dto: LoginDto) {
        // Extrai o corpo da requisição e o valida de acordo com o LoginDto.
        return this.authService.login(dto);
        // Chama o método login do serviço de autenticação e retorna o resultado.
    }
        
    @Post('register')
    // Mapeia a rota 'POST /auth/register' para este método.
    @HttpCode(HttpStatus.OK)
    // Define que o código de status HTTP para a resposta será 200 OK.
    register(@Body() dto: RegisterDto) {
        // Extrai o corpo da requisição e o valida de acordo com o RegisterDto.
        return this.authService.register(dto);
        // Chama o método register do serviço de autenticação e retorna o resultado.
    }
}