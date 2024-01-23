import { Injectable } from '@nestjs/common'; // Injectable é um decorador que marca uma classe como disponível para ser fornecida e injetada como dependência.
import { InjectModel } from '@nestjs/mongoose'; // InjectModel é um decorador que permite a injeção do modelo Mongoose correspondente ao esquema fornecido.
import { Model } from 'mongoose'; // Model é uma interface do Mongoose que fornece métodos para consultar o banco de dados.
import { User, UserDocument } from './schemas/user.schema'; // Importando o esquema do usuário e a interface do documento do usuário.
import { RegisterDto } from './dtos/register.dto'; // Importando o DTO (Data Transfer Object) para registro de usuário.
import * as CryptoJS from 'crypto-js'; // Importando a biblioteca CryptoJS para criptografia.

@Injectable() // Marcando a classe UserService como injetável.
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // Injetando o modelo do usuário no construtor da classe.
  ) {}

  async create(dto: RegisterDto) {
    // Método para criar um novo usuário.
    dto.password = CryptoJS.AES.encrypt(
      // Criptografando a senha do usuário.
      dto.password,
      process.env.USER_CYPHER_SECRET_KEY,
    ).toString();

    const createdUser = new this.userModel(dto); // Criando uma nova instância do modelo do usuário com os dados fornecidos.
    await createdUser.save(); // Salvando o novo usuário no banco de dados.
  }

  async existsByEmail(email: string): Promise<boolean> {
    // Método para verificar se um usuário já existe com o e-mail fornecido.
    const result = await this.userModel.findOne({ email }); // Procurando um usuário com o e-mail fornecido.
    if (result) {
      // Se um usuário for encontrado...
      return true; // ...retorna verdadeiro.
    }
    return false; // Se nenhum usuário for encontrado, retorna falso.
  }

  async getUserByLoginPassword(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = (await this.userModel.findOne({ email })) as UserDocument;

    if (user) {
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.USER_CYPHER_SECRET_KEY,
      );
      const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (password === savedPassword) {
        return user;
      }
    }
    return null;
  }
}
