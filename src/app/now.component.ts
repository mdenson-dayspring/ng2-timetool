import { Component, OnInit } from '@angular/core';

import { AppState } from "./app.service";
import { Context } from "./context.model";
import { TimelineComponent } from "./timeline.component";

@Component({
    template: `
        <timeline></timeline>
        <p>Hours worked so far: {{context.now.hours.toString()}} less lunch: {{context.now.hoursLessLunch.toString()}}</p>
    `,
    selector: 'now-summary',
    directives: [TimelineComponent],
})
export class NowComponent implements OnInit {
    context: Context;

    constructor(private _contextService: AppState) { }

    ngOnInit() {
        this._contextService.context$.subscribe(updatedContext => {
            this.context = updatedContext;
        });
    }
}
