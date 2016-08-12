import { Component, OnInit } from '@angular/core';

import { AppState } from '../services';
import { DayOfWeek, Context } from '../models';

@Component({
    template: require('app/settings/settings.component.html'),
    selector: 'settings'
})
export class SettingsComponent implements OnInit {
    private context: Context;
    private dayLabels: string[];

    constructor(private _appState: AppState) {
        this.dayLabels = [];
        this.dayLabels[DayOfWeek.SUN] = 'Sunday';
        this.dayLabels[DayOfWeek.MON] = 'Monday';
        this.dayLabels[DayOfWeek.TUE] = 'Tuesday';
        this.dayLabels[DayOfWeek.WED] = 'Wednesday';
        this.dayLabels[DayOfWeek.THU] = 'Thursday';
        this.dayLabels[DayOfWeek.FRI] = 'Friday';
        this.dayLabels[DayOfWeek.SAT] = 'Saturday';
    }

    ngOnInit() {
        this.context = this._appState.getContext();
    }

    private save() {
        this._appState.save(this.context);
    }
}
