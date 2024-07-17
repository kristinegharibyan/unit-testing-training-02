import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as forecastEffects from '../shared/store/forecast/forecast.effects';
import { forecastFeature } from '../shared/store/forecast/forecast.feature';
import * as locationsEffects from '../shared/store/locations/locations.effects';
import { locationsFeature } from '../shared/store/locations/locations.feature';
import { routes } from './app.routes';
import { initialize } from './initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects([locationsEffects, forecastEffects]),
    provideState(locationsFeature),
    provideState(forecastFeature),
    provideHttpClient(withFetch()),
    provideStoreDevtools(),
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [Store],
      multi: true,
    },
  ],
};
