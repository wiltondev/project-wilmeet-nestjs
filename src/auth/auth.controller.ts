/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto,  } from "./dtos/login.dto";
import { RegisterDto } from "src/user/dtos/register.dto";



@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:LoginDto){
        return this.authService.login(dto)
    }
        
    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() dto:RegisterDto){
        return this.authService.register(dto)
    }
}