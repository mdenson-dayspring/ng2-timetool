import { Component, Input, OnInit } from '@angular/core';

import { Context, HM } from '../models';
import { AppState } from '../services';

@Component({
    template: require('./timeline.component.html'),
    styles: [require('./timeline.component.css')],
    selector: 'timeline'
})
export class TimelineComponent implements OnInit {
    context: Context;
    timeWorked: string;
    timeTotal: string;
    timeLeft: string;
    am: string;
    lunch: string;
    pm: string;
    constructor(private _appState: AppState) { }

    ngOnInit() {
        this._setup(this._appState.getContext());
        this._appState.context$.subscribe(updated => {
            this._setup(updated);
        });
    }

    private _setup(context: Context) {
        this.context = context;

        let amPerc: number = 0;
        let lunchPerc: number = 0;
        let pmPerc: number = 0;
        let noon = new HM('12:00');
        let afterLunch = noon.add(context.today.lunch);
        let noonMinutes = noon.sub(context.today.arrive);

        if (context.now) {
            this.timeWorked = context.now.hoursLessLunch.toString();
            this.timeTotal = context.now.hours.toString();
            this.timeLeft = context.today.timeLeft().toString();

            let totalMin = context.today.hours.minutes;
            if (context.now.leave.minutes < noon.minutes) {
                console.log('am');
                amPerc = Math.round(context.now.hours.minutes / totalMin * 100);
                this.timeWorked = context.now.hours.toString();
            } else if (context.now.leave.minutes < afterLunch.minutes) {
                console.log('lunch');
                amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
                let lunch = context.now.hours.sub(noonMinutes).minutes;
                lunchPerc = Math.round(lunch / totalMin * 100);
                this.timeWorked = noonMinutes.toString();
            } else {
                console.log('pm');
                amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
                lunchPerc = Math.round(context.now.lunch.minutes / totalMin * 100);
                let pm = context.now.hoursLessLunch.sub(noonMinutes).minutes;
                pmPerc = Math.round(pm / totalMin * 100);
            }
            console.log(amPerc, lunchPerc, pmPerc);
            if (amPerc + lunchPerc + pmPerc > 100) {
                pmPerc = 100 - (amPerc + lunchPerc);
            }
            this.am = '' + amPerc + '%';
            this.lunch = '' + lunchPerc + '%';
            this.pm = '' + pmPerc + '%';
        } else {
            this.am = '0%';
            this.lunch = '0%';
            this.pm = '0%';
        }
    }
}
