import { Component, OnInit } from '@angular/core';

import { Context } from './models';
import { AppState } from './app.service';

import { TimelineComponent } from './timeline.component';

@Component({
    template: `
        <timeline></timeline>
        <p>Hours worked so far: {{ hours }} 
        less lunch: {{ hoursLessLunch }}</p>
    `,
    selector: 'now-summary',
    directives: [TimelineComponent]
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
