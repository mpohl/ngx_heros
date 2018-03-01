import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmoduleComponent } from './submodule/submodule.component';
import { LocalizeRouterModule } from 'localize-router';

const submoduleRoutes: Routes = [
  { path: 'submodule',  component: SubmoduleComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(submoduleRoutes),
    LocalizeRouterModule.forChild(<any> submoduleRoutes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class SubmoduleRoutingModule { }
