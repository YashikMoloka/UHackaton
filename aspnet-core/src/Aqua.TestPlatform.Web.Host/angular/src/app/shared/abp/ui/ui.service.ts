import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  block(element?: ElementRef) {
    console.log('UiService:block is not implemented');
  }

  unblock(element?: ElementRef) {
    console.log('UiService:unblock is not implemented');
  }

  setBusy(element?: ElementRef) {
    console.log('UiService:setBusy is not implemented');
  }

  clearBusy(element?: ElementRef) {
    console.log('UiService:clearBusy is not implemented');
  }
}
