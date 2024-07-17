import { Store } from "@ngrx/store";
import { LocationsActions } from "../shared/store/locations/locations.actions";

export function initialize(store: Store) {
  return () => store.dispatch(LocationsActions.loadFromLocalStorage());
}