import {Component} from '@angular/core';

import {AppState} from './app.service';
import {TimelineComponent} from './timeline.component';

@Component({
    template: `
        <timeline></timeline>
        <p>Time left: {{_context.today.timeLeft().toString()}}</p>
    `,
    selector: 'eod-summary',
    directives: [TimelineComponent],
})
export class EodComponent {
    constructor(private _context: AppState) { }
}
