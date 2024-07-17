import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, debounceTime, exhaustMap, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocationsService } from '../../services/locations.service';
import { UtilsService } from '../../services/utils.service';
import { WeatherLocation } from '../../types/location.type';
import { LocationsActions } from './locations.actions';
import { locationsFeature } from './locations.feature';

export const searchLocations$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const locationsService = inject(LocationsService);
    return actions$.pipe(
      ofType(LocationsActions.searchLocations),
      debounceTime(500),
      exhaustMap(({ query }) => {
        return locationsService.searchLocations(query).pipe(
          map((locations) =>
            LocationsActions.searchLocationsSuccess({ locations })
          ),
          catchError((error) =>
            of(LocationsActions.searchLocationsFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const saveToLocalStorage$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const storage = inject(LocalStorageService);
    const utils = inject(UtilsService);

    return actions$.pipe(
      ofType(
        LocationsActions.addToFavorites,
        LocationsActions.removeFromFavorites
      ),
      concatLatestFrom(() =>
        store.select(locationsFeature.selectFavoriteLocations)
      ),
      tap(([, favoriteLocations]) => {
        const favs = utils.clone(favoriteLocations).map((loc) => {
          delete (loc as any).favorite;
          return loc;
        });
        storage.removeItem('favoriteLocations');
        const favoriteLocationsString = JSON.stringify(favs);
        storage.setItem('favoriteLocations', favoriteLocationsString);
      })
    );
  },
  { dispatch: false, functional: true }
);

export const loadFromLocalStorage$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const storage = inject(LocalStorageService);
    return actions$.pipe(
      ofType(LocationsActions.loadFromLocalStorage),
      map(() => {
        // BUG: remove to become
        const favoriteLocations =
          JSON.parse(storage.getItem<WeatherLocation[]>('favoriteLocations') as unknown as string);
        return LocationsActions.setFavoritesBulk({ locations: favoriteLocations })
        
      })
    );
  },
  { functional: true },
);
