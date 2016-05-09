import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { Context, HM, Today } from './models';

@Injectable()
export class AppState {
    context$: Observable<Context>;
    private _dataStore: {
        context: Context
    };

    constructor() {
        this._dataStore = { context: new Context() };
    }

    getContext(): Context {
        return this._dataStore.context;
    }

    loadContext() {
        let localStorage = window.localStorage;
        let context = this._dataStore.context;

        let dataVersion: string = localStorage['dataVersion'];

        if (dataVersion) {

            context.staff = localStorage['staff'];
            context.arriveStr = localStorage['arriveStr'];
            context.lunchStr = localStorage['lunchStr'];
            context.leaveStr = localStorage['leaveStr'];

            context.gSun = localStorage['gSun'];
            context.gMon = localStorage['gMon'];
            context.gTue = localStorage['gTue'];
            context.gWed = localStorage['gWed'];
            context.gThu = localStorage['gThu'];
            context.gFri = localStorage['gFri'];
            context.gSat = localStorage['gSat'];

        } else { // defaults

            context.staff = 'mdenson';
            context.arriveStr = '09:30';
            context.lunchStr = '00:30';
            context.leaveStr = '17:30';

            context.gSun = '';
            context.gMon = '7:48';
            context.gTue = '7:48';
            context.gWed = '7:48';
            context.gThu = '7:48';
            context.gFri = '7:48';
            context.gSat = '';
            this.save(context);

        }

        // Create Observable Stream to output our data
        this.context$ = Observable
            .interval(1000)
            .map(() => {
                return HM.Now();
            })
            .filter((value) => {
                let context: Context = this._dataStore.context;
                return (!context.now || context.now.leave.decimal !== value.decimal);
            })
            .do((v: HM) => this.updateNow(v))
            .map(() => {
                return this._dataStore.context;
            })
            .share();
    }

    public updateNow(nowHM) {
        console.log('updateNow() ', nowHM.toString());
        let context: Context = this._dataStore.context;
        context.today = new Today(
            new HM(context.arriveStr),
            new HM(context.lunchStr),
            new HM(context.leaveStr));
        context.now = new Today(
            new HM(context.arriveStr),
            new HM(context.lunchStr),
            nowHM);
    }

    public save(context: Context) {
        var localStorage = window.localStorage;
        localStorage['dataVersion'] = 2;

        localStorage['staff'] = context.staff;
        localStorage['arriveStr'] = context.arriveStr;
        localStorage['lunchStr'] = context.lunchStr;
        localStorage['leaveStr'] = context.leaveStr;
        localStorage['gSun'] = context.gSun;
        localStorage['gMon'] = context.gMon;
        localStorage['gTue'] = context.gTue;
        localStorage['gWed'] = context.gWed;
        localStorage['gThu'] = context.gThu;
        localStorage['gFri'] = context.gFri;
        localStorage['gSat'] = context.gSat;
    }
}