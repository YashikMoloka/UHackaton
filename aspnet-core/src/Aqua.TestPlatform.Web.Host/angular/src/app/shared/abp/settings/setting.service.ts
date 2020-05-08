import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  get(name: string) {
    console.log('SettingService:get is not implemented');
    // return abp.setting.get(name);
  }

  getBoolean(name: string) {
    console.log('SettingService:getBoolean is not implemented');
    // return abp.setting.getBoolean(name);
  }

  getInt(name: string) {
    console.log('SettingService:getInt is not implemented');
    // return abp.setting.getInt(name);
  }

}
