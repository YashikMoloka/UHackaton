import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { LocalizationService } from '@abp/localization/localization.service';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { MessageService } from '@abp/message/message.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { UtilsService } from '@abp/utils/utils.service';
import { Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  public localization: LocalizationService;
  public permission: PermissionCheckerService;
  public feature: FeatureCheckerService;
  public notify: NotifyService;
  public setting: SettingService;
  public message: MessageService;
  public multiTenancy: AbpMultiTenancyService;
  public appSession: AppSessionService;
  public utils: UtilsService;
  public router: Router;
  public metaService: MetaService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.localization = injector.get(LocalizationService);
    this.permission = injector.get(PermissionCheckerService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(AbpMultiTenancyService);
    this.appSession = injector.get(AppSessionService);
    // this.elementRef = injector.get(ElementRef);
    this.utils = injector.get(UtilsService);
    this.metaService = injector.get(MetaService);
  }

  l(key: string, args?: string[]): string {
    let localizedText = this.localization.localize(key, this.localizationSourceName);

    if (!localizedText) {
        localizedText = key;
    }

    if (!args || !args.length) {
        return localizedText;
    }

    args.unshift(localizedText);
    return this.utils.formatString(args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }

  // helpers
  constructMetaTitle(section: string, page: string): string {
    return `MetaPage${this.capitalizeFirstLetter(section)}${this.capitalizeFirstLetter(page)}Title`;
  }
  constructMetaDescription(section: string, page: string): string {
    return `MetaPage${this.capitalizeFirstLetter(section)}${this.capitalizeFirstLetter(page)}Description`;
  }
  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
