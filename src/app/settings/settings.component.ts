import { Component, OnInit } from '@angular/core';

import { AppState } from '../services';
import { DayOfWeek, Context } from '../models';

@Component({
    template: require('app/settings/settings.component.html'),
    selector: 'settings'
})
export class SettingsComponent implements OnInit {
    private _context: Context;
    private _dayLabels: string[];

    constructor(private _appState: AppState) { 
        this._dayLabels = [];
        this._dayLabels[DayOfWeek.SUN] = 'Sunday';
        this._dayLabels[DayOfWeek.MON] = 'Monday';
        this._dayLabels[DayOfWeek.TUE] = 'Tuesday';
        this._dayLabels[DayOfWeek.WED] = 'Wednesday';
        this._dayLabels[DayOfWeek.THU] = 'Thursday';
        this._dayLabels[DayOfWeek.FRI] = 'Friday';
        this._dayLabels[DayOfWeek.SAT] = 'Saturday';
    }

    ngOnInit() {
        this._context = this._appState.getContext();
        this._appState.context$.subscribe(updated => {
            this._context = updated;
        });

    }

}
