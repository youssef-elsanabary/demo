/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TweetModule } from './tweet/tweet.module';
import { FollowModule } from './follow/follow.module';
import { Tweet } from './tweet/entities/tweet.entity';
import { AuthModule } from './auth/auth.module';
import { Follow } from './follow/entities/follow.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    // Database Configuration
    SequelizeModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : (config : ConfigService)=>({
        dialect : 'postgres',
        host : config.get<string>('DB_HOST'),
        port : config.get<number>('DB_PORT'),
        username : config.get<string>('DB_USERNAME'),
        password :config.get<string>("DB_PASSWORD"),
        database : config.get<string>('DB_NAME'),
        autoLoadModels : true,
        synchronize : true,
        models :[User , Tweet , Follow],
      }),
      inject: [ConfigService]
    }),

      //Graphql Configration
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
    UserModule,
    TweetModule,
    FollowModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
