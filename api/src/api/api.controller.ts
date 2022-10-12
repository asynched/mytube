import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class ApiController {
  @Get('/status')
  getStatus() {
    return {
      status: 'up',
    };
  }
}
