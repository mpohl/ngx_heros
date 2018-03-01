import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmoduleComponent } from './submodule/submodule.component';
import {SubmoduleRoutingModule} from './submodule-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SubmoduleRoutingModule
  ],
  declarations: [SubmoduleComponent]
})
export class SubmoduleModule { }
