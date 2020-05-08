import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  debug(logObject?: any): void {
    console.log(logObject);
    // abp.log.debug(logObject);
  }

  info(logObject?: any): void {
    console.log(logObject);
    // abp.log.info(logObject);
  }

  warn(logObject?: any): void {
    console.log(logObject);
    // abp.log.warn(logObject);
  }

  error(logObject?: any): void {
    console.log(logObject);
    // abp.log.error(logObject);
  }

  fatal(logObject?: any): void {
    console.log(logObject);
    // abp.log.fatal(logObject);
  }

}
