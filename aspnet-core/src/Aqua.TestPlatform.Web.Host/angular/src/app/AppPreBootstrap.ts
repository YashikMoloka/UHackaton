import { Injector } from '@angular/core';
import { AbpUserConfigurationService } from '@abp/abp-user-configuration.service';
import { LocalizationService } from '@abp/localization/localization.service';

export class AppPreBootstrap {

  static run(appRootUrl: string, injector: Injector) {
    console.log('[appInitializer] AppPreBootstrap');
    return AppPreBootstrap.getApplicationConfig(injector)
      .then(() => AppPreBootstrap.getUserConfiguration(injector));
  }

  private static getApplicationConfig(injector: Injector) {
    // var lang = injector.get(LanguageServiceProxy);
    // var langSettings = injector.get(LocalizationService);
    // return lang.getAllActive(undefined, undefined, undefined).toPromise().then(t => {
    //   console.log('[DEBUG] t items', t);
    //   langSettings.languages = t.items;
    //   console.log('[appInitializer] ApplicationConfig', langSettings.languages);
    // });
    return Promise.resolve();
  }

  private static getUserConfiguration(injector: Injector) {
    const userConfigurationService = injector.get(AbpUserConfigurationService);
    return userConfigurationService.initialize(true);
  }
}
