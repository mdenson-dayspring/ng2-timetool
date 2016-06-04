"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
require('rxjs/Rx');
var eod_component_1 = require('./eod/eod.component');
var now_component_1 = require('./now/now.component');
var settings_component_1 = require('./settings/settings.component');
var App = (function () {
    function App(_appState) {
        this._appState = _appState;
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        this._appState.loadContext();
        this._appState.context$.subscribe(function (updated) {
            _this.time = updated.now.leave.toString();
        });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: require('app/app.component.html'),
            styles: [require('app/app.component.css')],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/now', name: 'Now', component: now_component_1.NowComponent },
            { path: '/eod', name: 'Eod', component: eod_component_1.EodComponent },
            { path: '/settings', name: 'Settings', component: settings_component_1.SettingsComponent },
            { path: '/', component: now_component_1.NowComponent }
        ])
    ], App);
    return App;
}());
exports.App = App;
