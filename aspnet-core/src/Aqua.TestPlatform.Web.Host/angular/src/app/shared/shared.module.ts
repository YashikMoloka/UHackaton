import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';
import { AbpPaginationControlsComponent } from '@shared/pagination/abp-pagination-controls.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { BlockDirective } from '@shared/directives/block.directive';
import { BusyDirective } from '@shared/directives/busy.directive';
import { EqualValidator } from '@shared/directives/equal-validator.directive';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppUrlService } from '@shared/nav/app-url.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { OnlyNumber } from '@shared/directives/only-number.directive';
import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedFormsAutocompleteComponent } from './forms/shared-forms-autocomplete/shared-forms-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BlockUIModule } from 'ng-block-ui';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    AbpModule,
    RouterModule,
    NgxPaginationModule,
    CommonModule,
    MDBBootstrapModulesPro,
    RouterModule,
    FormsModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormlyModule.forChild({
      types: [
        { name: 'shared-autocomplete', component: SharedFormsAutocompleteComponent, wrappers: ['form-field'] },
      ],
    }),
    FormlySelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    BlockUIModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    ScrollingModule,
    MatStepperModule,
  ],
  exports: [
    AbpPaginationControlsComponent,
    LocalizePipe,
    BlockDirective,
    BusyDirective,
    EqualValidator,
    TransferHttpModule,
    ServiceProxyModule,
    OnlyNumber,
  ],
  declarations: [
    AbpPaginationControlsComponent,
    LocalizePipe,
    BlockDirective,
    BusyDirective,
    EqualValidator,
    OnlyNumber,
    SharedFormsAutocompleteComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard
      ]
    };
  }
}
