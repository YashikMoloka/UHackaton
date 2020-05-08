import { Injectable } from '@angular/core';
import { MultiTenancySides } from '@abp/multi-tenancy/multi-tenancy-sides.enum';

@Injectable({
  providedIn: 'root'
})
export class AbpSessionService {
  userId: number | undefined;
  tenantId: number | undefined;
  impersonatorUserId: number | undefined;
  impersonatorTenantId: number | undefined;
  multiTenancySide: MultiTenancySides;
}
