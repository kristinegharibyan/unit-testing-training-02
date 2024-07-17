import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { skipUntil, switchMap } from "rxjs";
import { ForecastActions } from "../store/forecast/forecast.actions";
import { forecastFeature } from "../store/forecast/forecast.feature";
import { BulkForecastItem } from "../types/forecast.type";

export const forecastResolver: ResolveFn<BulkForecastItem[]> = () => { 
  const store = inject(Store);
  const actions = inject(Actions);
  store.dispatch(ForecastActions.forecastPageLoaded());
  return actions.pipe(
    skipUntil(actions.pipe(ofType(ForecastActions.getForecastSuccess))),
    switchMap(() => store.select(forecastFeature.selectForecast)),
  );
}