import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
    template: `
        <p>Settings Page</p>
    `,
    selector: 'settings'
})
export class SettingsComponent {
    constructor(private _appState: AppState) { }
}
