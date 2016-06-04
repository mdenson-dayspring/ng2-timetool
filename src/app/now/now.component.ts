import { Component, OnInit } from '@angular/core';

import { Context } from '../models';
import { AppState } from '../app.service';

import { TimelineComponent } from '../timeline/timeline.component';
import { WeekChartDirective } from '../weekchart/weekchart.component';

@Component({
    template: require('app/now/now.component.html'),
    selector: 'now-summary',
    directives: [TimelineComponent, WeekChartDirective]
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
        }
    }
}
