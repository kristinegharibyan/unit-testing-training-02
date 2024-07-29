import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { WeatherLocation } from '../../types/location.type';
import { LocationsActions } from './locations.actions';

export type LocationsState = {
  locations: WeatherLocation[];
  favoriteLocations: WeatherLocation[];
  loading: boolean;
  error: string | null;
};

const locationsReducer = createReducer<LocationsState>(
  {
    locations: [],
    favoriteLocations: [],
    loading: false,
    error: null,
  },
  on(LocationsActions.searchLocations, (state) => ({
    ...state,
    loading: true,
  })),
  on(LocationsActions.searchLocationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LocationsActions.searchLocationsSuccess, (state, { locations }) => ({
    ...state,
    locations,
  })),
  on(LocationsActions.addToFavorites, (state, { location }) => ({
    ...state,
    favoriteLocations: [...state.favoriteLocations, location],
  })),
  on(LocationsActions.removeFromFavorites, (state, { location }) => ({
    ...state,
    favoriteLocations: state.favoriteLocations.filter(loc => loc.id !== location.id),
  })),
  on(LocationsActions.setFavoritesBulk, (state, { locations }) => {
    return {
      ...state,
      favoriteLocations: locations,
    };
  }),
);

export const locationsFeature = createFeature({
  name: 'locations',
  reducer: locationsReducer,
  extraSelectors: ({ selectFavoriteLocations, selectLocations }) => ({
    selectLocationResults: createSelector(
      selectLocations,
      selectFavoriteLocations,
      (locations, favorites) => {
        return locations.map(location => ({
          ...location,
          favorite: favorites.map(fav => `${fav.lat},${fav.lon}`).includes(`${location.lat},${location.lon}`),
        }));
      }
    ),
  }),
});
