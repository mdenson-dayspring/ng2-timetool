import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.service';
import { Context } from './context.model';
import { TimelineComponent } from './timeline.component';

@Component({
    template: `
        <timeline></timeline>
        <p>Hours worked so far: {{ context.now.hours.toString() | async }} 
        less lunch: {{ context.now.hoursLessLunch.toString() | async }}</p>
    `,
    selector: 'now-summary',
    directives: [TimelineComponent]
})
export class NowComponent implements OnInit {
    context:Observable<Context>;

    constructor(private _appState: AppState) { }

    ngOnInit() {
        this.context = this._appState.context$; 
    }
}
