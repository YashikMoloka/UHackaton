import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  info(message: string, title?: string, options?: any): any {
    console.log('MessageService:info is not implemented');
    // return abp.message.info(message, title, options);
  }

  success(message: string, title?: string, options?: any): any {
    console.log('MessageService:success is not implemented');
    // return abp.message.success(message, title, options);
  }

  warn(message: string, title?: string, options?: any): any {
    console.log('MessageService:warn is not implemented');
    // return abp.message.warn(message, title, options);
  }

  error(message: string, title?: string, options?: any): any {
    console.log('MessageService:error is not implemented');
    // return abp.message.error(message, title, options);
  }

  confirm(message: string, title?: string, callback?: (result: boolean) => void, options?: any): any {
    console.log('MessageService:confirm is not implemented');
    // return abp.message.confirm(message, title, callback, options);
  }

}
