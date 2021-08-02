import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const candidate = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await hash(password, 5);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException("Пользователь не найден!", 400);
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException("Неверный пароль!", 400);
    }
    const jwtSecret: string = "fhiahifhio";
    const token = await sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });
    return { token, userId: user.id };
  }
}
