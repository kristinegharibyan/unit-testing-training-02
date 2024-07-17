import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, filter, map } from "rxjs/operators";
import { ForecastService } from "../../services/forecast.service";
import { locationsFeature } from "../locations/locations.feature";
import { ForecastActions } from "./forecast.actions";

export const loadForecast$ = createEffect(() => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const forecastService = inject(ForecastService);
    return actions$.pipe(
        ofType(ForecastActions.forecastPageLoaded),
        concatLatestFrom(() => store.select(locationsFeature.selectFavoriteLocations)),
        filter(([, locations]) => {
            return locations.length > 0;
        }),
        exhaustMap(([, locations]) => {
            return forecastService.getBulkForecast(locations).pipe(
                map(forecast => ForecastActions.getForecastSuccess({ forecast: forecast.bulk })),
                catchError(error => of(ForecastActions.getForecastFailure({ error }))),
            );
        }),
    );
}, {functional: true});