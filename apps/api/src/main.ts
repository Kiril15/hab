import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from "@nestjs/common"
import { useContainer } from 'class-validator';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  app.enableCors({
    origin: process.env.CLIENT_URL?.split(","),
    credentials: true
  })

  useContainer(
    app.select(AppModule), { fallbackOnErrors: true }
  );

  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,            
    }),
);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
