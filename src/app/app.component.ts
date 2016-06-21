import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import 'rxjs/Rx';

import {EodComponent} from './eod/eod.component';
import {NowComponent} from './now/now.component';
import {SettingsComponent} from './settings/settings.component';

import { AppState } from './services';
import { Context, HM } from './models';

@Component({
    selector: 'app',
    template: require('app/app.component.html'),
    styles: [require('app/app.component.css')],
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
