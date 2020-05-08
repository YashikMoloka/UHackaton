// angular
import { NgModule, ViewEncapsulation, Component } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CookieService, CookieBackendService, CookieModule } from '@gorniv/ngx-universal';
import { AbpModule } from '@abp/abp.module';

@NgModule({
  imports: [
    // AppModule - FIRST!!!
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
  ],
})
export class AppServerModule {}
