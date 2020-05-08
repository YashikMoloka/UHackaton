import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';
import { TokenService } from '@abp/auth/token.service';
import { Router } from '@angular/router';
import { AppSessionService } from '@shared/session/app-session.service';

@Injectable()
export class AppAuthService {

  constructor(private utils: UtilsService, private auth: TokenService, private router: Router, private session: AppSessionService) {}
  logout(reload?: boolean): void {
    this.auth.clearToken();
    this.session.resetUser();

    this.utils.setCookieValue(AppConsts.authorization.encryptedAuthTokenName, undefined, undefined, '/');
    if (reload !== false) {
      this.router.navigate(['/']);
    }
  }
}
