import { createFeature, createReducer, on } from "@ngrx/store";
import { BulkForecastItem } from "../../types/forecast.type";
import { ForecastActions } from "./forecast.actions";

export type ForecastState = { 
  forecast: BulkForecastItem[];
  loading: boolean;
  error: string | null;
};

export const forecastReducer = createReducer<ForecastState>(
  {
    forecast: [],
    loading: false,
    error: null,
  },
  on(ForecastActions.forecastPageLoaded, (state) => ({
    ...state,
    loading: true,
  })),
  on(ForecastActions.getForecastSuccess, (state, { forecast }) => ({
    ...state,
    loading: false,
    forecast,
    error: null,
  })),
  on(ForecastActions.getForecastFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const forecastFeature = createFeature({
  name: 'forecast',
  reducer: forecastReducer,
});