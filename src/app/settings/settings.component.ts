import { Component, OnInit } from '@angular/core';

import { AppState } from '../services';
import { Context } from '../models';

@Component({
    template: require('app/settings/settings.component.html'),
    selector: 'settings'
})
export class SettingsComponent implements OnInit {
    private _context: Context;

    constructor(private _appState: AppState) { }

    ngOnInit() {
        this._context = this._appState.getContext();
        this._appState.context$.subscribe(updated => {
            this._context = updated;
        });

    }

}
