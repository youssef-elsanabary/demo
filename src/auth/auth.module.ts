/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/_Jwt/JwtStrategy';
import { JwtAuthGuard } from 'src/_guard/jwt-auth-guard.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtsecret',
      signOptions:{expiresIn:'120s'},
    })
  ],
  providers: [AuthResolver, AuthService , JwtStrategy ,JwtAuthGuard],
})
export class AuthModule {}
