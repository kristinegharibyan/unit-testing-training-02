import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { WeatherLocation } from "../../types/location.type";

export const LocationsActions = createActionGroup({
  source: 'Locations',
  events: {
    'Search Locations': props<{ query: string }>(),
    'Search Locations Failure': props<{ error: string }>(),
    'Search Locations Success': props<{ locations: WeatherLocation[] }>(),
    'Add to Favorites': props<{ location: WeatherLocation }>(),
    'Remove from Favorites': props<{ location: WeatherLocation }>(),
    'Load from Local Storage': emptyProps(),
    'Set Favorites Bulk': props<{ locations: WeatherLocation[] }>(),
  },
});