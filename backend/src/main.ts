import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Use NestExpressApplication

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Set Referrer-Policy header
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }
    next();
  });

  const configService = app.get(ConfigService); // Get ConfigService instance
  const port = configService.get<number>('PORT');

  await app.listen(5200);
}
bootstrap();
