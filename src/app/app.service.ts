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

        let dataVersion: string = localStorage.getItem('dataVersion');

        if (dataVersion) {

            context.staff = localStorage.getItem('staff');
            context.arriveStr = localStorage.getItem('arriveStr');
            context.lunchStr = localStorage.getItem('lunchStr');
            context.leaveStr = localStorage.getItem('leaveStr');

            context.gSun = localStorage.getItem('gSun');
            context.gMon = localStorage.getItem('gMon');
            context.gTue = localStorage.getItem('gTue');
            context.gWed = localStorage.getItem('gWed');
            context.gThu = localStorage.getItem('gThu');
            context.gFri = localStorage.getItem('gFri');
            context.gSat = localStorage.getItem('gSat');

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
                let c: Context = this._dataStore.context;
                return (!c.now || c.now.leave.decimal !== value.decimal);
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
        let localStorage = window.localStorage;
        localStorage.setItem('dataVersion', 2);

        localStorage.setItem('staff', context.staff);
        localStorage.setItem('arriveStr', context.arriveStr);
        localStorage.setItem('lunchStr', context.lunchStr);
        localStorage.setItem('leaveStr', context.leaveStr);
        localStorage.setItem('gSun', context.gSun);
        localStorage.setItem('gMon', context.gMon);
        localStorage.setItem('gTue', context.gTue);
        localStorage.setItem('gWed', context.gWed);
        localStorage.setItem('gThu', context.gThu);
        localStorage.setItem('gFri', context.gFri);
        localStorage.setItem('gSat', context.gSat);
    }
}
