import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './consumer/consumer.module';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConsumerModule,
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) => req.headers['x-correlation-id'] || randomUUID(),
        autoLogging: false,
        quietReqLogger: true,
        transport: {
          target: 'pino-pretty',
          options: {
            destination: 1, // use 2 for stderr
          },
        },
        mixin: (context: any) => {
          console.log('pino: ', context);
          const correlationId = context.reqId;
          return { 'x-correlation-id': correlationId };
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
