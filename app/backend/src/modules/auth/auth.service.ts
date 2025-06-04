import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { ReturnDataDto } from './dto/returnData.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<ReturnDataDto> {
    const { email, password, name, contactPhone } = signUpDto;

    const userData = await this.userService.findByEmail(email);
    if (userData) {
      throw new ConflictException(
        'Пользователь с указанным email уже существует!',
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      email,
      passwordHash,
      name,
      contactPhone: contactPhone || 'Не указан',
    });

    const token = this.jwtService.sign({ email: newUser.email });
    return { token, role: newUser.role, id: newUser._id.toString() };
  }
  async signIn(signInDto: SignInDto): Promise<ReturnDataDto> {
    const { email, password } = signInDto;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userData.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Неправильный email или пароль!');
    }

    const token = this.jwtService.sign({ email: userData.email });
    return { token, role: userData.role, id: userData._id.toString() };
  }
  async checkAuth(data: {
    email: string;
  }): Promise<{ role: string; id: string }> {
    const { email } = data;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }
    return { role: userData.role, id: userData._id.toString() };
  }}
