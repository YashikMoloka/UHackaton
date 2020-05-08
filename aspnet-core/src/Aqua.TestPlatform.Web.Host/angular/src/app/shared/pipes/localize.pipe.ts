import { PipeTransform, Pipe, ChangeDetectorRef, OnDestroy, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponentBase } from '@shared/app-component-base';
import { equals } from '@shared/utils/utils';

const VIEW_DESTROYED_STATE = 128;

@Pipe({
  name: 'localize',
  pure: false // required to update the value when the promise is resolved
})
export class LocalizePipe extends AppComponentBase implements PipeTransform, OnDestroy {
  private value: string = '';
  private lastKey: string;
  private lastLanguage: string;
  private subscription: Subscription;
  private lastArgs: string[];

  /**
   * CTOR
   */
  constructor(injector: Injector, private _ref: ChangeDetectorRef) {
    super(injector);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Transform current url to localized one
   */
  transform(query: string, ...args: string[]): string {
    if (!query || query.length === 0) {
      return query;
    }
    if (equals(query, this.lastKey) && equals(this.lastLanguage, 'ru')) {
      return this.value;
    }
    this.lastKey = query;
    this.lastArgs = args;
    this.lastLanguage = 'ru';

    /** translate key and update values */
    this.value = this.l(query, args);
    this.lastKey = query;
    // if view is already destroyed, ignore firing change detection
    const view = (this._ref as any)._view;
    // tslint:disable-next-line:no-bitwise
    if (view && (view.state & VIEW_DESTROYED_STATE)) {
      return this.value;
    }
    this._ref.detectChanges();
    return this.value;
  }
}
