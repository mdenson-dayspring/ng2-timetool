import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import 'rxjs/Rx';

import {EodComponent} from './eod.component';
import {NowComponent} from './now.component';
import {SettingsComponent} from './settings.component';

import { AppState } from './app.service';
import { Context, HM } from './models';

@Component({
    selector: 'app',
    template: `
        <h1>Today's Progress -  {{ time }}</h1>
        <nav>
          <a [routerLink]="['Now']">Now</a>
          <a [routerLink]="['Eod']">End</a>
          <a [routerLink]="['Settings']">Setting</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    { path: '/now', name: 'Now', component: NowComponent },
    { path: '/eod', name: 'Eod', component: EodComponent },
    { path: '/settings', name: 'Settings', component: SettingsComponent },
    { path: '/', component: NowComponent }
])

export class App implements OnInit {
    time: string;

    constructor(private _appState: AppState) { }

    ngOnInit() {
        this._appState.loadContext();
        this._appState.context$.subscribe(updated => {
            this.time = updated.now.leave.toString();
        });
    }
}