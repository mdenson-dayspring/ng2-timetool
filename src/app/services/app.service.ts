import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { DayOfWeek, Context, HM, Today } from '../models';

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

        if (dataVersion === '2') {

            context.staff = localStorage.getItem('staff');
            context.expected.arrive = localStorage.getItem('arriveStr');
            context.expected.lunch = localStorage.getItem('lunchStr');
            context.expected.leave = localStorage.getItem('leaveStr');

            context.goals[DayOfWeek.SUN] = localStorage.getItem('gSun');
            context.goals[DayOfWeek.MON] = localStorage.getItem('gMon');
            context.goals[DayOfWeek.TUE] = localStorage.getItem('gTue');
            context.goals[DayOfWeek.WED] = localStorage.getItem('gWed');
            context.goals[DayOfWeek.THU] = localStorage.getItem('gThu');
            context.goals[DayOfWeek.FRI] = localStorage.getItem('gFri');
            context.goals[DayOfWeek.SAT] = localStorage.getItem('gSat');
            this.save(context);

        } else if (dataVersion === '3') {

            let dataStr = localStorage.getItem('contextData');
            let data = JSON.parse(dataStr);
            context.staff = data.staff;

            context.expected.arrive = data.expected.arrive;
            context.expected.lunch = data.expected.lunch;
            context.expected.leave = data.expected.leave;

            data.goals.forEach((g, ndx) => {
                context.goals[ndx] = g;
            });
            this.save(context);


        } else { // defaults

            context = new Context();

            context.staff = 'mdenson';

            context.expected.arrive = '09:30';
            context.expected.lunch = '00:30';
            context.expected.leave = '17:30';

            context.goals[DayOfWeek.SUN] = '';
            context.goals[DayOfWeek.MON] = '7:48';
            context.goals[DayOfWeek.TUE] = '7:48';
            context.goals[DayOfWeek.WED] = '7:48';
            context.goals[DayOfWeek.THU] = '7:48';
            context.goals[DayOfWeek.FRI] = '7:48';
            context.goals[DayOfWeek.SAT] = '';
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
                return (!c.now || !c.now.leave.equals(value));
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
            new HM(context.expected.arrive),
            new HM(context.expected.lunch),
            new HM(context.expected.leave));
        context.now = new Today(
            new HM(context.expected.arrive),
            new HM(context.expected.lunch),
            nowHM);
    }

    public save(context: Context) {
        let localStorage = window.localStorage;
        localStorage.setItem('dataVersion', '3');

        let data = {
            staff: context.staff,
            expected: {
                arrive: context.expected.arrive,
                leave: context.expected.leave,
                lunch: context.expected.lunch
            },
            goals: [
                context.goals[DayOfWeek.SUN],
                context.goals[DayOfWeek.MON],
                context.goals[DayOfWeek.TUE],
                context.goals[DayOfWeek.WED],
                context.goals[DayOfWeek.THU],
                context.goals[DayOfWeek.FRI],
                context.goals[DayOfWeek.SAT]
            ]
        };
        localStorage.setItem('contextData', JSON.stringify(data));
    }
}
