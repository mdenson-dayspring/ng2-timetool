import {Component, Input} from '@angular/core';

import { AppState } from './app.service';

@Component({
    templateUrl: './app/timeline.component.html',
    selector: 'timeline'
})
export class TimelineComponent {
    constructor(private _context: AppState) { }
}
