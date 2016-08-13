import { Component }      from '@angular/core';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';

import { AppState } from '../services';
import { DayOfWeek, Context } from '../models';

@Component({
    template: require('app/settings/settings.component.html'),
    selector: 'settings',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SettingsComponent {
    private settingsForm: FormGroup;
    private context: Context;
    private dayLabels: string[];

    constructor(private _appState: AppState, fb: FormBuilder) {
        this.dayLabels = [];
        this.dayLabels[DayOfWeek.SUN] = 'Sunday';
        this.dayLabels[DayOfWeek.MON] = 'Monday';
        this.dayLabels[DayOfWeek.TUE] = 'Tuesday';
        this.dayLabels[DayOfWeek.WED] = 'Wednesday';
        this.dayLabels[DayOfWeek.THU] = 'Thursday';
        this.dayLabels[DayOfWeek.FRI] = 'Friday';
        this.dayLabels[DayOfWeek.SAT] = 'Saturday';

        this.context = this._appState.getContext();
        this.settingsForm = fb.group({
            'arrive': this.context.expected.arrive,
            'lunch': this.context.expected.lunch,
            'leave': this.context.expected.leave,
            'staff': this.context.staff,
            'Sunday': this.context.goals[0],
            'Monday': this.context.goals[1],
            'Tuesday': this.context.goals[2],
            'Wednesday': this.context.goals[3],
            'Thursday': this.context.goals[4],
            'Friday': this.context.goals[5],
            'Saturday': this.context.goals[6]
        });

        this.settingsForm.valueChanges
            // .map((value) => {
            //     value.firstName = value.firstName.toUpperCase();
            //     return value;
            // })
            // .filter((value) => this.settingsForm.valid)
            .subscribe((value) => {
                console.log('Model Driven Form valid value: vm = ', JSON.stringify(value));
            });
    }

    private save(form: FormGroup) {
        console.log('form changed?:', form.dirty);
        console.log('you saved value:', form.value);
        // this._appState.save(this.context);
    }
}
