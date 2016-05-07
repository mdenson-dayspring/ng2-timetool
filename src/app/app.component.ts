import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import {EodComponent} from "./eod.component";
import {NowComponent} from "./now.component";
import {SettingsComponent} from "./settings.component";

import { AppState } from './app.service';
import { Context } from './context.model';

@Component({
    selector: 'app',
    template: `
        <h1>Today's Progress - {{ context.now.leave.toString() }}</h1>
        <nav>
          <a [routerLink]="['/now']">Now</a>
          <a [routerLink]="['/eod']">End of Day</a>
          <a [routerLink]="['/settings']">Settings</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
})
@Routes([
    {path:'/now',      component: NowComponent},
    {path:'/eod',      component: EodComponent},
    {path:'/settings', component: SettingsComponent},
    {path:'*',         component: NowComponent}
])

export class App implements OnInit {
    context: Observable<Context>;
    
    constructor(private _contextService: AppState) { 
        console.log("App contructor");
        this.context = this._contextService.context$;
        this._contextService.loadContext();
    }

    ngOnInit() {
        console.log("App ngOnInit");
        Observable.interval(1000).subscribe(() => {
            console.log("One second heartbeat.");
            this._contextService.updateNow();
        });
    }
}