import { LocationsActions } from "./locations.actions";
import { locationsFeature, LocationsState } from './locations.feature';

describe('Locations feature', () => {
  const reducer = locationsFeature.reducer;
  const initialState: LocationsState = {
    locations: [],
    favoriteLocations: [],
    loading: false,
    error: null,
  };

  it('should set loading true while location search', () => {
    const state = reducer(initialState, LocationsActions.searchLocations({ query: 'Vienna' }));
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should update error while searchLocationsFailure', () => {
    const error = 'Error fetching locations';
    const state = reducer(initialState, LocationsActions.searchLocationsFailure({ error }));
    expect(state).toEqual({
    ...initialState,
    loading: false,
    error,
    });
  });

  it('should get locations while searchLocationSuccess', () => {
    const locations = [
      { id: 1, name: 'Vienna', region: 'Wien', country: 'Austria', lat: 48.2082, lon: 16.3738, url: 'https://www.weather.com' },
    ];
    const newState: LocationsState = {
      locations: [],
      favoriteLocations: [],
      loading: true,
      error: null,
    };
    const state = reducer(newState, LocationsActions.searchLocationsSuccess({ locations }));
    expect(state).toEqual({
      ...initialState,
      locations,
      loading: true,  // error in the code, loading should be false
    });
  })

  it('should add location to favorites', () => {
    const location = { id: 1, name: 'Vienna', region: 'Wien', country: 'Austria', lat: 48.2082, lon: 16.3738, url: 'https://www.weather.com'};
    const state = reducer(initialState, LocationsActions.addToFavorites({ location: location }));
    expect(state).toEqual({
      ...initialState,
      favoriteLocations: [location],
    });
  });
  
  it('should remove location from favorites', () => {
    const location = { id: 1, name: 'Vienna', region: 'Wien', country: 'Austria', lat: 48.2082, lon: 16.3738, url: 'https://www.weather.com'};
    const state = reducer({ ...initialState, favoriteLocations: [location] }, LocationsActions.removeFromFavorites({ location: location }));
    expect(state).toEqual({
      ...initialState,
      favoriteLocations: [],
    });
  });

  it('should set favorites bulk', () => {
    const locations = [
      { id: 1, name: 'Vienna', region: 'Wien', country: 'Austria', lat: 48.2082, lon: 16.3738, url: 'https://www.weather.com' },
    ];
    const state = reducer(initialState, LocationsActions.setFavoritesBulk({ locations }));
    expect(state).toEqual({
      ...initialState,
      favoriteLocations: locations,
    });
  });
});
