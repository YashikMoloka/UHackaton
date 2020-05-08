import { Injectable, Injector } from '@angular/core';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppSessionService } from '../session/app-session.service';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';

@Injectable()
export class AppRouteGuard extends AppComponentBase implements CanActivate, CanActivateChild {

    constructor(
      private injector: Injector,
      private _permissionChecker: PermissionCheckerService,
      private _sessionService: AppSessionService,
    ) {
      super(injector);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return new Promise<boolean>((resolve => {
        AppConsts.AppInitPromise.finally(() => {
          if (!this._sessionService.user) {
            this.router.navigate(['/account/login']);
            resolve(false);
            return;
          }

          if (!route.data || !route.data['permission']) {
            resolve(true);
            return;
          }

          if (this._permissionChecker.isGranted(route.data['permission'])) {
            resolve(true);
            return;
          }

          this.router.navigate([this.selectBestRoute()]);
          resolve(false);
        });
      }));
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        if (!this._sessionService.user) {
            return '/account/login';
        }

        // if (this._permissionChecker.isGranted('Pages.Users')) {
        //     return '/cabinet';
        // }

        return '/';
    }
}
