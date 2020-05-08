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
    selector: '[busy]'
})
@Injectable()
export class BusyDirective implements AfterViewInit, OnChanges {
  @Input('busy') loading: boolean;

  constructor(private _element: ElementRef, private ui: UiService) { }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'].currentValue) {
        this.ui.setBusy(this._element);
    } else {
        this.ui.clearBusy(this._element);
    }
  }
}
