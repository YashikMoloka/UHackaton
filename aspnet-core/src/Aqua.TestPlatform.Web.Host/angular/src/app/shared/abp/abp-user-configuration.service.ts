import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '@abp/auth/token.service';
import { AppConsts } from '@shared/AppConsts';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { LocalizationService } from '@abp/localization/localization.service';

@Injectable({
  providedIn: 'root'
})
export class AbpUserConfigurationService {

    constructor(private injector: Injector) {
        
    }

    initialize(isLoadedFirstTime: boolean = false): Promise<any> {
      const http = this.injector.get(HttpClient);
      const lang = this.injector.get(LocalizationService);
      const auth = this.injector.get(TokenService);
      const culture = 'ru-RU';
      console.log('[appInitializer] UserConfig Start');
      return http.get(AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll', {
        headers: {
          'Authorization': 'Bearer ' + auth.getToken(),
          '.AspNetCore.Culture': culture,
          'Abp.TenantId': '1'
        }
      }).toPromise().then(result => {
        var data = (<any>result).result;

        const session = this.injector.get(AbpSessionService);
        const sData = data.session;
        session.userId = sData.userId;
        session.tenantId = sData.tenantId;
        session.impersonatorUserId = sData.impersonatorUserId;
        session.impersonatorTenantId = sData.impersonatorTenantId;
        session.multiTenancySide = sData.multiTenancySide;

        const localization = lang;
        const locData = data.localization;
        localization.defaultSourceName = locData.defaultSourceName;
        localization.currentLanguage = locData.currentLanguage;
        localization.currentCulture = locData.currentCulture;
        localization.languages = locData.languages;
        localization.values = locData.values;
        localization.sources = locData.sources;
        localization.applyLanguage();

        const auth = this.injector.get(TokenService);
        const authData = data.auth;
        auth.allPermissions = authData.allPermissions;
        auth.grantedPermissions = authData.grantedPermissions;

        console.log('[appInitializer] UserConfig Ready', data);
      });
    }

}
