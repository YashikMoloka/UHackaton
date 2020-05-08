import { NgModule } from '@angular/core';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { Observable } from 'rxjs';
import { LocalizationService } from '@abp/localization/localization.service';
import { AppConsts } from '@shared/AppConsts';

export function metaFactory(translate: LocalizationService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string): Promise<string> => AppConsts.AppInitPromise.then(t => translate.localize(key)),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'MetaAppName',
    defaults: {
      title: 'DEFAULT_TITLE',
      description: 'DEFAULT_DESC',
      'og:site_name': 'MetaAppName',
      'og:type': 'website',
      'og:locale': 'ru_RU',
      'og:locale:alternate': 'ru_RU,en_US',
    },
  });
}

@NgModule({
  imports: [
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
      deps: [LocalizationService],
    }),
  ],
})
export class SharedMetaModule {}
