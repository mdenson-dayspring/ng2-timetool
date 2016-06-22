import {Component, OnInit} from '@angular/core';

import { Context } from '../models';
import { AppState } from '../services';

import {TimelineComponent} from '../timeline/timeline.component';
import { WeekComponent } from '../week';

@Component({
    template: require('app/eod/eod.component.html'),
    selector: 'eod-summary',
    directives: [TimelineComponent, WeekComponent]
})
export class EodComponent implements OnInit {
    hours: string;
    timeLeft: string;

    constructor(private _appState: AppState) { }

    ngOnInit() {
        this.setHours(this._appState.getContext());
        this._appState.context$.subscribe(updated => {
            this.setHours(updated);
        });
    }

    setHours(context: Context) {
        if (context.today) {
            this.hours = context.today.hoursLessLunch.toString();
            this.timeLeft = context.today.timeLeft().toString();
        }
    }
}
