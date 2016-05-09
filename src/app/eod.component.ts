import {Component, OnInit} from '@angular/core';

import { Context } from './models';
import { AppState } from './app.service';

import {TimelineComponent} from './timeline.component';

@Component({
    template: `
        <timeline></timeline>
        <p>Time left: {{ timeLeft }}</p>
    `,
    selector: 'eod-summary',
    directives: [TimelineComponent]
})
export class EodComponent implements OnInit {
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
            this.timeLeft = context.today.timeLeft().toString();
        }
    }
}
