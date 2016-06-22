import { Component, Input } from '@angular/core';

import { Context, DayInfo, HM } from '../models';
import { AppState } from '../services';

import { WeekChartDirective } from '../week/weekchart.component';

@Component({
    template: require('app/week/week.component.html'),
    selector: 'week-summary',
    directives: [WeekChartDirective]
})
export class WeekComponent {
    todayDoW: number;
    week: DayInfo[];

    private today: Date;
    private _showNow: boolean = false;
    private todayHoursHM: HM;

    private _appContext: Context;

    @Input()
    set todayHours(hours: number) {
        this.today = new Date();
        this.todayDoW = this.today.getDay();
        this.todayHoursHM = new HM(hours);
        this.fillHours();
    }
    get todayHoursDisplay(): string {
        return this.todayHoursHM.toString();
    }

    get todayDate(): string {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }
        let d = this.today;
        return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
    }


    constructor(private _appState: AppState) {
        this.today = new Date();
        this.todayDoW = this.today.getDay();
    }

    private fillHours() {
        let context = this._appState.getContext();
        let week = [
            new DayInfo('Sunday', context.gSun),
            new DayInfo('Monday', context.gMon),
            new DayInfo('Tuesday', context.gTue),
            new DayInfo('Wednesday', context.gWed),
            new DayInfo('Thursday', context.gThu),
            new DayInfo('Friday', context.gFri),
            new DayInfo('Saturday', context.gSat)
        ];

        week[1].setActual('8:00');
        week[2].setActual('8:06');
        week[3].setActual('7:30');
        week[4].setActual('8:00');
        week[5].setActual('8:00');

        week[this.todayDoW].setActual(this.todayHoursHM);

        this.week = week;
    }
}
