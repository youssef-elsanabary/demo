/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
   // Sync models
   const sequelize = app.get<Sequelize>(Sequelize)
  await sequelize.sync({ alter: true }).catch(
    err => {
       console.error('Sequelize Sync Error:', err)
      })
}
bootstrap();
