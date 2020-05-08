// angular
import {
  APP_INITIALIZER, Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  InjectFlags,
  InjectionToken,
  Injector,
  isDevMode,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { CookieModule, CookieService } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from '@shared/storage/universal.storage';
// interceptors
import { AbpModule } from '@abp/abp.module';

// import * as _ from 'lodash';
import { AppConsts } from '@shared/AppConsts';
import { AppPreBootstrap } from './AppPreBootstrap';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { environment } from '../environments/environment';
import { UiService } from '@abp/ui/ui.service';
import { LocalizationService } from '@abp/localization/localization.service';
import { CountoModule } from 'angular2-counto';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { MDBRootModules, ToastModule } from 'ng-uikit-pro-standard';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'ng-block-ui';
import { MatProgressSpinnerModule } from '@angular/material';
import { TnsRouteReuseStrategy } from './tns-route-reuse-strategy';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { ArkModule } from './ark/ark.module';
import { IndexComponent } from './index/index.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MDBRootModulePro } from 'ng-uikit-pro-standard/lib/pro/mdb-pro.module';
import { MatButtonModule } from '@angular/material/button';

export function appInitializerFactory(injector: Injector,
                                      platformLocation: PlatformLocation) {
  return () => {
    const ui = injector.get(UiService);
    ui.setBusy();
    console.log('[appInitializer] Start');
    AppConsts.AppInitPromise = new Promise<boolean>((resolve, reject) => {
      AppConsts.appBaseHref = getBaseHref(platformLocation);
      AppConsts.appBaseUrl = injector.get<string>(<any>'ORIGIN_URL');
      console.log('[appInitializer] Environment', environment);
      if (environment.isServer)
        AppConsts.appBaseUrl = environment.host;
      AppConsts.remoteServiceBaseUrl = getRemoteServiceBaseUrl();

      const appBaseUrl = AppConsts.appBaseUrl + AppConsts.appBaseHref;

      console.log('[appInitializer] AppConsts', {
        remoteServiceBaseUrl: AppConsts.remoteServiceBaseUrl,
        appBaseUrl: AppConsts.appBaseUrl,
        appBaseHref: AppConsts.appBaseHref
      });

      AppPreBootstrap.run(appBaseUrl, injector).then(() => {
        console.log('[appInitializer] AppPreBootstrap End');
        // abp.event.trigger('abp.dynamicScriptsInitialized');
        const appSessionService: AppSessionService = injector.get(AppSessionService);
        const localization = injector.get(LocalizationService);
        console.log('[appInitializer] appSession Start');
        appSessionService.init().then(
          () => {
            console.log('[appInitializer] appSession End');
            ui.clearBusy();

            if (shouldLoadLocale(localization)) {
              // const angularLocale = convertAbpLocaleToAngularLocale(localization.currentLanguage.name);
              // console.log('angularLocale');
              const angularLocale = 'ru';
              // import(`@angular/common/locales/${angularLocale}.js`)
              //   .then(module => {
              //     registerLocaleData(module.default);
              //     resolve(result);
              //   }, reject);
              // console.log('angularLocale Ready');
            }
            console.log('[appInitializer] End');
            resolve(true);
          },
          (err) => {
            ui.clearBusy();
            reject(err);
          }
        );
      });
    });
    // init lang
    return Promise.all([AppConsts.AppInitPromise]);
  };
}

// export function convertAbpLocaleToAngularLocale(locale: string): string {
//   if (!AppConsts.localeMappings) {
//     return locale;
//   }
//
//   const localeMapings = _.filter(AppConsts.localeMappings, { from: locale });
//   if (localeMapings && localeMapings.length) {
//     return localeMapings[0]['to'];
//   }
//
//   return locale;
// }

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

export function shouldLoadLocale(localization: LocalizationService): boolean {
  // console.log('shouldLoadLocale');
  //   // console.log(localization);
  return localization.currentLanguage.name && localization.currentLanguage.name !== 'en-US';
}

export function getCurrentLanguage(localization: LocalizationService): string {
  if (localization.currentLanguage.name) {
    return localization.currentLanguage.name;
  }

  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'ru';
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  const baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
    return baseUrl;
  }

  return '/';
}

export function getRemoteServiceBaseUrl(): string {
  if (!environment.production)
    return 'http://localhost:21021';
  return AppConsts.appBaseUrl;
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
    pan: {
      direction: 6
    },
    pinch: {
      enable: false
    },
    rotate: {
      enable: false
    }
  };
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    SharedModule.forRoot(),
    AbpModule.forRoot(),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    NgxPageScrollModule,
    MDBRootModules,
    ToastModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule,
    CountoModule,
    FormsModule,
    AppRoutes,
    BlockUIModule.forRoot(),
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormlyMatToggleModule,
    ArkModule,
    MatSidenavModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    IndexComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Lf2acEUAAAAAIhVLHe-vblHzhwuccCe6Veq0GnJ' } as RecaptchaSettings,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    CookieService,
    UniversalStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AbpHttpInterceptor,
      multi: true
    },
    {
      provide: API_BASE_URL,
      useFactory: getRemoteServiceBaseUrl
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage,
      deps: [LocalizationService],
    },
    { provide: COMPILER_OPTIONS, useValue: [{ useDebug: false, useJit: true }], multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
    {
      provide: RouteReuseStrategy,
      useClass: TnsRouteReuseStrategy
    }
  ],
})
export class AppModule {
}

