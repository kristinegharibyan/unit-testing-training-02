import { query } from "@angular/animations";
import { ForecastActions } from "./forecast.actions";
import { forecastFeature, ForecastState } from './forecast.feature';

describe('Forecast feature', () => {
  const reducer = forecastFeature.reducer;
  const initialState: ForecastState = {
    forecast: [],
    loading: false,
    error: null,
  };

  it('should set loading true when forecastPageLoaded is dispatched', () => {
    const state = reducer(initialState, ForecastActions.forecastPageLoaded());
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set error and loading to false while getForecastFailure', () => {
    const error = 'Error fetching forecast';
    const state = reducer(initialState, ForecastActions.getForecastFailure({ error }));
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});