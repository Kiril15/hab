import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from "@nestjs/common"
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { getCorsConfig, getValidationPipeConfig } from './config/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  const config = app.get(ConfigService)

  app.enableCors(getCorsConfig(config))

  useContainer(
    app.select(AppModule), { fallbackOnErrors: true }
  );

  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
