import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth.service';
import { ReturnDataDto } from './dto/returnData.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<ReturnDataDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<ReturnDataDto> {
    return this.authService.signIn(signInDto);
  }

  @Get('/checkauth')
  @UseGuards(JwtAuthGuard)
  checkAuth(
    @Query() data: { email: string },
  ): Promise<{ role: string; id: string }> {
    return this.authService.checkAuth(data);
  }
}
