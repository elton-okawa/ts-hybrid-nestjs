import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @EventPattern('tp.test')
  async handleTest(payload: Record<string, unknown>) {
    console.log(payload);
  }
}
