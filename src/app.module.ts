import { Module } from '@nestjs/common';
import { GatewayModule } from './websockerts/websocket.module';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
