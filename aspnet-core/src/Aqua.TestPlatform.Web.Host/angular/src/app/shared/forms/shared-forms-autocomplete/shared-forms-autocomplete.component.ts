import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shared-forms-autocomplete',
  templateUrl: './shared-forms-autocomplete.component.html'
})
export class SharedFormsAutocompleteComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild(MatInput, { static: false }) formFieldControl: MatInput;
  @ViewChild(MatAutocompleteTrigger, { static: false }) autocomplete: MatAutocompleteTrigger;

  filter: Observable<any>;

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(term => this.to.filter(term)),
      );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // temporary fix for https://github.com/angular/material2/issues/6728
    (<any> this.autocomplete)._formField = this.formField;
  }

}
