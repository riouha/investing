import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '~/modules/auth/types/token.interface';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): ITokenPayload => {
  return ctx.switchToHttp().getRequest().user;
});
