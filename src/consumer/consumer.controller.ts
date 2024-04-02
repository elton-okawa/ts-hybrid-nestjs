import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  @EventPattern('tp.test')
  async handleTest(payload: Record<string, unknown>) {
    this.logger.log(payload);
  }
}
