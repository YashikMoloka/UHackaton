import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private cookieService: CookieService) {
    
  }
  
  getCookieValue(key: string): string {
    return this.cookieService.get(key) || '';
    // return abp.utils.getCookieValue(key);
  }

  setCookieValue(key: string, value: string, expireDate?: Date, path?: string, domain?: string): void {
    this.cookieService.put(key, value, {expires: expireDate, path: path, domain: domain});
    // abp.utils.setCookieValue(key, value, expireDate, path);
  }

  deleteCookie(key: string, path?: string): void {
    this.cookieService.remove(key);
    // abp.utils.deleteCookie(key, path);
  }

  formatString(args: string[]) {
    if (args.length < 1) {
      return null;
    }

    var str = args[0];

    for (var i = 1; i < args.length; i++) {
      var placeHolder = '{' + (i - 1) + '}';
      str = this.replaceAll(str, placeHolder, args[i]);
    }

    return str;
  }

  replaceAll(str: string, search: string, replacement: string): string {
    const fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(fix, 'g'), replacement);
  }
}
