import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BulkForecastItem, ForecastApiResponse } from "../../types/forecast.type";

export const ForecastActions = createActionGroup({
    'source': 'Forecast',
    events: {
        'Forecast Page Loaded': emptyProps(), 
        'Get Forecast Success': props<{forecast: BulkForecastItem[]}>(),
        'Get Forecast Failure': props<{error: string}>(),
    },
});