import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err, user) {
    // console.log(user);

    if (err) {
      throw err;
    }

    if (!user) {
      throw new UnauthorizedException(
        'Доступно только для авторизованных пользователей',
      );
    }
    return user;
  }
}
