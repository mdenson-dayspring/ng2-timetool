import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule, REACTIVE_FORM_PROVIDERS }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { provide }          from '@angular/core';

import { LocationStrategy, HashLocationStrategy }  from '@angular/common';

/*
 * App Component
 * our top level component that holds all of our components
 */
import { App, APP_PROVIDERS } from '../app';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ App ],
  providers: [
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ...APP_PROVIDERS,
    REACTIVE_FORM_PROVIDERS
  ],
  bootstrap: [ App ]
})
export class AppModule { }
