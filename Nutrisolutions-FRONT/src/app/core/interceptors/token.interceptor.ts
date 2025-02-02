import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONST } from '../constants/constants.config';
import { LoggerService } from 'src/app/services/logger.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  logger = inject(LoggerService);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(APP_CONST.tokenLocalStorage);
    this.logger.info('===================INTERCEPTED=================');

    // Clone the request and add the authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
