import {
    AfterViewInit,
    Directive,
    ElementRef,
    Injectable,
    HostListener,
    Input,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { UiService } from '@abp/ui/ui.service';

@Directive({
    selector: '[block]'
})
@Injectable()
export class BlockDirective implements AfterViewInit, OnChanges {
  @Input('block') loading: boolean;

  constructor(private _element: ElementRef, private ui: UiService) { }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      // $.blockUI.defaults.overlayCSS.cursor = 'not-allowed';
    if (changes['loading'].currentValue) {
      this.ui.block(this._element);
    } else {
      this.ui.unblock(this._element);
    }
  }
}
