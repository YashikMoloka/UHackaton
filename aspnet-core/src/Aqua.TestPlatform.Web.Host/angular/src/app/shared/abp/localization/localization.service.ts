/* tslint:disable:no-var-keyword */
import { Inject, Injectable } from '@angular/core';
import { UtilsService } from '@abp/utils/utils.service';
import { ChangeUserLanguageDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { AbpUserConfigurationService } from '@abp/abp-user-configuration.service';
import { BlockUIService } from 'ng-block-ui';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  languages: ILanguageInfo[];
  currentLanguage: ILanguageInfo;
  sources: ILocalizationSource[];
  defaultSourceName: string = 'TransneftCabinet';
  currentCulture: any;

  values: { [key: string]: string };

  private unknown: string[] = [];
  unknownEvents: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  // todo remove
  private isLoadedFirstTime: boolean;

  constructor(private utils: UtilsService, private _userService: UserServiceProxy,
              private auth: AppSessionService, private userConf: AbpUserConfigurationService,
              private blockUi: BlockUIService, @Inject(REQUEST) private req: any) {
  }

  get abpWeb(): (key: string) => string {
    return this.getSource('AbpWeb');
  }

  localize(key: string, sourceName?: string, args?: string[]): string {
    sourceName = sourceName || 'TransneftCabinet';

    const source = this.values[sourceName];

    if (!source) {
      console.log('Could not find localization source: ' + sourceName);
      return key;
    }

    const value = source[key];
    if (value == undefined) {
      this.addToUnknown(key);
      return key;
    }

    // const copiedArguments = Array.prototype.slice.call(args, 0);
    // copiedArguments.splice(1, 1);
    // copiedArguments[0] = value;
    //
    // return this.utils.formatString.apply(this, copiedArguments);
    return value;
  }

  private addToUnknown(key: string) {
    this.unknown.push(key);
    this.unknownEvents.next(this.getUnknown());
  }

  getUnknown(): string[] {
    return Array.from(new Set(this.unknown));
  }

  getSource(sourceName: string): (...key: string[]) => string {
    const loc = this.localize;
    return function (key) {
      const copiedArguments = Array.prototype.slice.call(arguments, 0);
      copiedArguments.splice(1, 0, sourceName);
      return loc.apply(this, copiedArguments);
    };
  }

  isCurrentCulture(name: string): boolean {
    return this.currentCulture
      && this.currentCulture.name
      && this.currentCulture.name.indexOf(name) == 0;
  }

  changeLanguage(languageName: string): void {
    const input = new ChangeUserLanguageDto();
    input.languageName = languageName;
    this.blockUi.start('block-ui-main');

    const change = this.auth.user ? this._userService.changeLanguage(input).toPromise() : Promise.resolve();
    change.then(() => {
      this.utils.setCookieValue(
        'Abp.Localization.CultureName',
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        '/'
      );
      // this.localService.changeLanguage(languageName);

      // window.location.reload();
      this.userConf.initialize().then(t => {
        this.blockUi.stop('block-ui-main');
        // TODO remove this hack
        window.location.reload();
      });
    });
  }

  applyLanguage() {
    this.utils.setCookieValue(
      'Abp.Localization.CultureName',
      this.currentLanguage.name,
      new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
      '/'
    );
    // this.localService.changeLanguage(this.currentLanguage.name);
  }

  getPredictedLang(isLoadedFirstTime: boolean) {
    return this.getUrlLangFirstTime(isLoadedFirstTime) ||
      this.utils.getCookieValue('Abp.Localization.CultureName') ||
      navigator.language ||
      'ru';
  }

  private getUrlLangFirstTime(isLoadedFirstTime: boolean) {
    if (isLoadedFirstTime) {
      console.log('[WLP]', this.req.path);
      return this.getLocationLang(this.req.path);
    }
    return undefined;
  }

  getLocationLang(url: string): string {
    const queryParamSplit = url.split('?');
    let pathSlices: string[] = [];
    if (queryParamSplit.length > 0) {
      pathSlices = queryParamSplit[0].split('/');
    }
    var loc = this.languages.map<string>(s => s.name);
    if (pathSlices.length > 1 && loc.indexOf(pathSlices[1]) !== -1) {
      return pathSlices[1];
    }
    if (pathSlices.length && loc.indexOf(pathSlices[0]) !== -1) {
      return pathSlices[0];
    }
    return null;
  }
}

interface ILanguageInfo {
  name: string;
  displayName?: string;
  icon?: string;
  isDefault?: boolean;
  isDisabled?: boolean;
}

interface ILocalizationSource {
  name: string;
  type: string;
}


