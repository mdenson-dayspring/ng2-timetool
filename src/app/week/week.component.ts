import { Component, Input, OnInit } from '@angular/core';

import { Context, DayInfo, HM } from '../models';
import { TimesheetService, AppState } from '../services';

import { WeekChartDirective } from '../week/weekchart.component';

@Component({
    template: require('app/week/week.component.html'),
    selector: 'week-summary',
    directives: [WeekChartDirective]
})
export class WeekComponent implements OnInit {
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

        let staff = this._appState.getContext().staff;

        this._timesheetService.loadTimeData(this.today, staff);
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


    constructor(
        private _appState: AppState,
        private _timesheetService: TimesheetService
    ) {
        this.today = new Date();
        this.todayDoW = this.today.getDay();
    }

    ngOnInit() {
        this._timesheetService.week$.subscribe(updated => {
            this.fillHours(updated);
        });

    }

    private fillHours(weekActuals: any[]) {
        let context = this._appState.getContext();
        let week: DayInfo[] = [
            new DayInfo('Sunday', context.gSun),
            new DayInfo('Monday', context.gMon),
            new DayInfo('Tuesday', context.gTue),
            new DayInfo('Wednesday', context.gWed),
            new DayInfo('Thursday', context.gThu),
            new DayInfo('Friday', context.gFri),
            new DayInfo('Saturday', context.gSat)
        ];

        weekActuals.forEach(actual => {
            week[actual.day_of_week].setActual(new HM(actual.minutes));
        });

        if (week[this.todayDoW].getActual() === undefined) {
            week[this.todayDoW].setActual(this.todayHoursHM);
        }

        this.week = week;
    }
}
