import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';

export class SignalRAspNetCoreHelper {
  static initSignalR(callback?: () => void): void {
    console.log('SignalR is not implemented!');
    // const encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encryptedAuthTokenName);
    //
    // abp.signalr = {
    //     autoConnect: true,
    //     connect: undefined,
    //     hubs: undefined,
    //     qs: AppConsts.authorization.encryptedAuthTokenName + '=' + encodeURIComponent(encryptedAuthToken),
    //     remoteServiceBaseUrl: AppConsts.remoteServiceBaseUrl,
    //     startConnection: undefined,
    //     url: '/signalr'
    // };
    //
    // const script = document.createElement('script');
    // if (callback) {
    //     script.onload = () => {
    //         callback();
    //     };
    // }
    // script.src = AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js';
    // document.head.appendChild(script);
  }
}
