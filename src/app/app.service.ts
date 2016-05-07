import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {Context} from './context.model';
import {HM} from './hm.model';
import {Today} from './today.model';

@Injectable()
export class AppState {
    context$: Observable<Context>;
    private _contextObserver: Observer<Context>;
    private _dataStore: {
        context: Context
    };

    constructor() {
        console.log('AppState constructor');
        this._dataStore = { context: new Context() };

        // Create Observable Stream to output our data
        this.context$ = new Observable<Context>(observer => this._contextObserver = observer)
            .share();
    }

    loadContext() {
        console.log('AppState loadContext');
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
        this.updateNow();
    }

    public updateNow() {
        console.log('AppState updateNow');
        var context: Context = this._dataStore.context;
        var nowHM = HM.Now();
        if (!context.now || context.now.leave.decimal != nowHM.decimal) {
            context.today = new Today(
                new HM(context.arriveStr),
                new HM(context.lunchStr),
                new HM(context.leaveStr));
            context.now = new Today(
                new HM(context.arriveStr),
                new HM(context.lunchStr),
                nowHM);
            if (this._contextObserver) {
                console.log('AppState call next');
                this._contextObserver.next(context);
            }
        }
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