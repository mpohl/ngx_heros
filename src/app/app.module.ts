import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular material
import {
  MatButtonModule, MatInputModule, MatSliderModule
} from '@angular/material';

import {NgIdleModule} from '@ng-idle/core';
import {MomentModule} from 'angular2-moment';

import {MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { ToastrModule } from 'ngx-toastr';
// import gestures
import 'hammerjs';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './hero/heroes.component';
import {HeroDetailComponent} from './hero/detail/hero-detail.component';
import {HeroService} from './_services/hero.service';
import {HeroSearchComponent} from './hero/search/hero-search.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  // shown warnings
  private warnings = [];

  handle(params: MissingTranslationHandlerParams) {
    // show not in production
    if (environment.envName !== 'prod') {
      // already shown?
      if (this.warnings.indexOf(params.key) === -1) {
        // mark warning as shown
        this.warnings.push(params.key);
        console.warn('mising translation for: ' + params.key);
      }
    }
    return '&iquest; ' + params['key'] + ' &iquest;';
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    NgIdleModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule, MatInputModule, MatSliderModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ngx Toastr Module
      closeButton : true,
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [
    HeroService,
    Title,
    AuthGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
