import { Injectable, Inject } from '@angular/core';
import { UtilsService } from '@abp/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    refreshTokenCookieName: string = 'Abp.AuthRefreshToken';
    tokenCookieName: string = 'Abp.AuthToken';

    allPermissions: { [name: string]: boolean }; 

    grantedPermissions: { [name: string]: boolean };

    constructor(private utils: UtilsService, @Inject('ORIGIN_URL') private url: string) {}

    isGranted(permissionName: string): boolean {
        return this.allPermissions[permissionName] != undefined &&
        this.grantedPermissions[permissionName] != undefined;
    }

    isAnyGranted(...args: string[]): boolean {
        if (!args || args.length <= 0) {
            return true;
          }
  
          for (var i = 0; i < args.length; i++) {
            if (this.isGranted(args[i])) {
              return true;
            }
          }
  
          return false;
    }

    areAllGranted(...args: string[]): boolean {
        if (!args || args.length <= 0) {
            return true;
          }
  
          for (var i = 0; i < args.length; i++) {
            if (!this.isGranted(args[i])) {
              return false;
            }
          }
  
          return true;
    }

    /**
     * Saves auth token.
     * @param authToken The token to be saved.
     * @param expireDate Optional expire date. If not specified, token will be deleted at end of the session.
     */
    setToken(authToken?: string, expireDate?: Date): void {
        var matches = this.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
        var domain = matches && matches[1];
        this.utils.setCookieValue(this.tokenCookieName, authToken, expireDate, '/', domain);
    }

    getToken(): string {
        return this.utils.getCookieValue(this.tokenCookieName);
    }

    clearToken(): void {
        this.setToken(null, null);
    }

    /**
     * Saves refreshToken token.
     * @param refreshToken The token to be saved.
     * @param expireDate Optional expire date. If not specified, token will be deleted at end of the session.
     */
    setRefreshToken(refreshToken?: string, expireDate?: Date): void {
        var matches = this.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
        var domain = matches && matches[1];
        this.utils.setCookieValue(this.refreshTokenCookieName, refreshToken, expireDate, '/', domain);
    }

    getRefreshToken(): string {
        return this.utils.getCookieValue(this.refreshTokenCookieName);
    }

    clearRefreshToken(): void {
        this.setRefreshToken(null, null);
    }
}
