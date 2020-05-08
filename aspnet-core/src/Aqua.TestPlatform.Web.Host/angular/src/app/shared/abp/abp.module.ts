import { ModuleWithProviders, NgModule } from '@angular/core';
import { AbpSessionService } from './session/abp-session.service';
import { PermissionCheckerService } from './auth/permission-checker.service';
import { FeatureCheckerService } from './features/feature-checker.service';
import { SettingService } from './settings/setting.service';
import { NotifyService } from './notify/notify.service';
import { MessageService } from './message/message.service';
import { LogService } from './consolelog/log.service';
import { AbpMultiTenancyService } from './multi-tenancy/abp-multi-tenancy.service';
import { AbpHttpConfiguration } from './abpHttpInterceptor';
import { TokenService } from './auth/token.service';
import { UtilsService } from './utils/utils.service';
import { UiService } from '@abp/ui/ui.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppUrlService } from '@shared/nav/app-url.service';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

@NgModule({
  declarations: [
  ],

  providers: [
    AbpHttpConfiguration
  ]
})
export class AbpModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AbpModule,
      providers: [
        AbpSessionService,
        PermissionCheckerService,
        FeatureCheckerService,
        SettingService,
        NotifyService,
        MessageService,
        LogService,
        AbpMultiTenancyService,
        TokenService,
        UtilsService,
        UiService
      ]
    };
  }
}
