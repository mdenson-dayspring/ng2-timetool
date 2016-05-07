import { Component } from '@angular/core';

import { AppState } from "./app.service";

@Component({
    templateUrl: './app/settings.component.html',
    selector: 'settings',
})
export class SettingsComponent {
    constructor(private _context: AppState) { }
}