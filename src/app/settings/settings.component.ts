import { Component } from '@angular/core';

import { AppState } from '../services';

@Component({
    template: `
        <p>Settings Page</p>
    `,
    selector: 'settings'
})
export class SettingsComponent {
    constructor(private _appState: AppState) { }
}
