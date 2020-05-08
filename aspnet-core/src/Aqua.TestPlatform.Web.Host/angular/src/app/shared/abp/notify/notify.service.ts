import { Injectable } from '@angular/core';

@Injectable()
export class NotifyService {

  info(message: string, title?: string, options?: any): void {
    console.log('NotifyService:info is not implemented');
    // abp.notify.info(message, title, options);
  }

  success(message: string, title?: string, options?: any): void {
    console.log('NotifyService:success is not implemented');
    // abp.notify.success(message, title, options);
  }

  warn(message: string, title?: string, options?: any): void {
    console.log('NotifyService:warn is not implemented');
    // abp.notify.warn(message, title, options);
  }

  error(message: string, title?: string, options?: any): void {
    console.log('NotifyService:error is not implemented');
    // abp.notify.error(message, title, options);
  }

}
