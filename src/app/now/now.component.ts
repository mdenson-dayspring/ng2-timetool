import { Component, OnInit } from '@angular/core';

import { Context, DayInfo } from '../models';
import { AppState } from '../services';

import { TimelineComponent } from '../timeline/timeline.component';
import { WeekComponent } from '../week';

@Component({
    template: require('app/now/now.component.html'),
    selector: 'now-summary',
    directives: [TimelineComponent, WeekComponent]
})
export class NowComponent implements OnInit {
    hours: string;
    hoursLessLunch: string;

    constructor(private _appState: AppState) { }

    ngOnInit() {
        this.setHours(this._appState.getContext());
        this._appState.context$.subscribe(updated => {
            this.setHours(updated);
        });

    }

    setHours(context: Context) {
        if (context.now) {
            this.hours = context.now.hours.toString();
            this.hoursLessLunch = context.now.hoursLessLunch.toString();
        } else {
            this.hours = '0:00';
            this.hoursLessLunch = '0:00';
        }
    }
}
