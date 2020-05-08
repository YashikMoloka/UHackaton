import { Injectable } from '@angular/core';
import { TokenService } from '@abp/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionCheckerService {

  constructor(private auth: TokenService) {}

  isGranted(permissionName: string): boolean {
    return this.auth.isGranted(permissionName);
  }
}
