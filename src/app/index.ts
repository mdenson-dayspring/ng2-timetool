// App
export * from './app.component';

import { TimesheetService, AppState } from './services';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  TimesheetService
];

