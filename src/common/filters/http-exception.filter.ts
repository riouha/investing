import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter<T extends HttpException> implements ExceptionFilter {
  public catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorResponse = exception.getResponse();
    response.status(exception.getStatus()).json({
      hasError: true,
      message: typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message,
    });
  }
}
