import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArkIndexComponent } from './ark-index/ark-index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    ArkIndexComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
  ],
})
export class ArkModule { }
