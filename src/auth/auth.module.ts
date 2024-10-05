import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as fs from 'fs';
import { JwtStrategy } from '../common/strategy.common/jwt-strategy.common';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync('private.pem'),
      publicKey: fs.readFileSync('public.pem'),
      signOptions: { expiresIn: '60m', algorithm: 'RS256' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
