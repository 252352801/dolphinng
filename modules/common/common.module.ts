import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import { FormsModule as NgFormsModule}         from '@angular/forms';
//components

import {QBtnGroupComponent} from '../../components/q-btn-group/q-btn-group.component';
//directives
import {BtnBackDirective} from '../../directives/btnBack/btnBack.directive';
import {TextMaxLengthDirective} from '../../directives/textMaxLength/textMaxLength.directive';
import {ToggleClassDirective} from '../../directives/toggleClass/toggleClass.directive';
@NgModule({
  imports:[
    NgCommonModule,
    NgFormsModule
  ],
  declarations: [
    QBtnGroupComponent,
    BtnBackDirective,
    TextMaxLengthDirective,
    ToggleClassDirective
  ],
  providers: [],
  exports: [
    QBtnGroupComponent,
    BtnBackDirective,
    TextMaxLengthDirective,
    ToggleClassDirective
  ]
})
export class CommonModule {
}
