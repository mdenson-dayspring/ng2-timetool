import { Component, Input, OnInit } from '@angular/core';

import { Context } from '../models';
import { AppState } from '../app.service';

@Component({
    template: require('./timeline.component.html'),
    selector: 'timeline'
})
export class TimelineComponent implements OnInit {
    context: Context;
    constructor(private _appState: AppState) { }

    ngOnInit() {
        this.context = this._appState.getContext();
        this._appState.context$.subscribe(updated => {
            this.context = updated;
        });
    }
}
