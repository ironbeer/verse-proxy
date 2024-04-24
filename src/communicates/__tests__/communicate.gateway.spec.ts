import { INestApplication, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommunicateGateway } from '../communicate.gateway';
import { Socket, io } from 'socket.io-client';
import { CommunicateService } from '../communicate.service';
import { ConfigService } from '@nestjs/config';

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  testingModule.useLogger(new Logger());

  return testingModule.createNestApplication();
}

describe('Communicate gateway', () => {
  let gateway: CommunicateGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    app = await createNestApp(
      CommunicateGateway,
      CommunicateService,
      ConfigService,
    );
    gateway = app.get<CommunicateGateway>(CommunicateGateway);
    ioClient = io('http://localhost:3000', {
      autoConnect: false,
      transports: ['websocket', 'pooling'],
    });
    app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`Should be defined`, () => {
    expect(gateway).toBeDefined();
  });

  it(`Should emit "pong" on "ping"`, async () => {
    ioClient.connect();
    ioClient.emit('ping', 'Hello World!');
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('Connected');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('Hello World!');
        resolve();
      });
    });

    ioClient.disconnect();
  });

  it(`Should emit "executed" on "execute"`, async () => {
    ioClient.connect();
    ioClient.emit('execute', { method: 'eth_chainId', data: '' });
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('Connected');
      });
      ioClient.on('executed', (data) => {
        expect(data.method).toBe('eth_chainId');
        expect(data.response).toBe('');
        resolve();
      });
    });

    ioClient.disconnect();
  });
});
