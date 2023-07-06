import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Investing Api Documentation')
    .addBearerAuth(
      {
        name: 'Access-Token',
        type: 'oauth2',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        flows: {
          password: {
            tokenUrl: '/auth/login',
            refreshUrl: '/auth/refresh-token',
            scopes: {},
          },
        },
      },
      'Access-Token',
    )
    .addBearerAuth({ name: 'Bearer', type: 'http', bearerFormat: 'bearer' }, 'Bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = app.get<ConfigService>(ConfigService).get('app.port');
  await app.listen(port, () => {
    console.info('------------------------------------------------------------');
    console.info(`| Server started on: http://localhost:${port}              |`);
    console.info(`| Swagger URL:       http://localhost:${port}/api-doc |`);
    console.info('------------------------------------------------------------');
  });
}
bootstrap();
