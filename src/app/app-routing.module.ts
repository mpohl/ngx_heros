import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero/detail/hero-detail.component';
import {HeroesComponent} from './hero/heroes.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'dashboard',  component: DashboardComponent },
  {path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]},
  {path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

/*
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
 */
