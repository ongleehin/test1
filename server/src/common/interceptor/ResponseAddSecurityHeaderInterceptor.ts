import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export default class ResponseAddSecurityHeaderInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
    // ResponseObj.setHeader('X-FRAME-OPTIONS', 'DENY');
    // ResponseObj.setHeader('X-Content-Type-Options', 'nosniff');
    // ResponseObj.setHeader('Content-Security-Policy', `frame-ancestors 'none'`);
    // ResponseObj.setHeader('X-XSS-Protection', '1; mode=block');
    // ResponseObj.setHeader('Content-Type', 'application/json');
    // ResponseObj.setHeader('Cache-Control', 'no-store');
    // ResponseObj.setHeader('Referrer-Policy', 'no-referrer');
    ResponseObj.setHeader('Access-Control-Allow-Origin', '*');
    ResponseObj.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, DELETE',
    );
    ResponseObj.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, x-requested-with',
    );
    // ResponseObj('Strict-Transport-Security-Header', 'max-age=31536000; includeSubDomains')
    return next.handle();
  }
}
