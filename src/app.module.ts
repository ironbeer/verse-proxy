import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './controllers';
import {
  ProxyService,
  TransactionService,
  VerseService,
  AllowCheckService,
  TypeCheckService,
  RateLimitService,
} from './services';
import { DatastoreService } from './repositories';
import configuration from './config/configuration';
import { CommunicateGateway } from './communicates/communicate.gateway';
import { WebSocketService } from './services/webSocket.sevice';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    CacheModule.register(),
  ],
  controllers: [ProxyController],
  providers: [
    WebSocketService,
    CommunicateGateway,
    VerseService,
    TransactionService,
    ProxyService,
    AllowCheckService,
    TypeCheckService,
    DatastoreService,
    RateLimitService,
  ],
})
export class AppModule {}
