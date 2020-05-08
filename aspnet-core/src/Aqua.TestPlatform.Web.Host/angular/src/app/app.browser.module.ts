// angular
import { APP_INITIALIZER, InjectFlags, InjectionToken, Injector, NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
// libs
import { REQUEST } from '@nguniversal/express-engine/tokens';
// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie }, path: window.location.pathname };
}


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: false }),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest,
    },
    { provide: 'ORIGIN_URL', useValue: location.origin },
  ],
})
export class AppBrowserModule {}

