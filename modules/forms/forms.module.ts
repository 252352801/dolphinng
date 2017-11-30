import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule as NgFormsModule}         from '@angular/forms';
import {CheckboxComponent} from '../../components/checkbox/checkbox.component';
import {RadioComponent}  from '../../components/radio/radio.component';
import {ToggleComponent} from '../../components/toggle/toggle.component';
import {HTML5ValidateDirective} from '../../directives/HTML5Validate/HTML5Validate.directive';
@NgModule({
  imports:[
    CommonModule,
    NgFormsModule
  ],
  declarations: [
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    HTML5ValidateDirective
  ],
  providers: [],
  exports: [
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    HTML5ValidateDirective
  ]
})
export class FormsModule {
}
