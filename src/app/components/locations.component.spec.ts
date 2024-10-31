import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LocationsComponent } from './locations.component';
import { LocationsActions } from '../../shared/store/locations/locations.actions';
import { WeatherLocation } from '../../shared/types/location.type';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  let store: MockStore;

  const initialState = {
    locations: {
      loading: false,
      results: [] as WeatherLocation[],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsComponent, MatProgressSpinnerModule],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addToFavorites action when favorite button is clicked', () => {
    const location: WeatherLocation = { 
      id: 1, 
      name: 'Vienna', 
      region: 'Wien', 
      country: 'Austria', 
      lat: 48.2082, 
      lon: 16.3738, 
      url: 'https://www.weather.com' 
    };
    
    store.setState({
      locations: {
        loading: false,
        results: [location],
        favoriteLocations: [],
      },
    });
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    const addButton = fixture.debugElement.query(By.css('#favorite-button'));
    addButton.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(LocationsActions.addToFavorites({ location }));
  });
    // Blocked, can't understand the reason my test is failing

  it('should dispatch removeFromFavorites action when favorite button is clicked', () => {
    const location: WeatherLocation = { 
      id: 1, 
      name: 'Vienna', 
      region: 'Wien', 
      country: 'Austria', 
      lat: 48.2082, 
      lon: 16.3738, 
      url: 'https://www.weather.com' 
    };
    
    store.setState({
      locations: {
        loading: false,
        results: [location],
        favoriteLocations: [location],
      },
    });
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    const removeButton = fixture.debugElement.query(By.css('#favorite-button'));
    removeButton.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(LocationsActions.removeFromFavorites({ location }));
  });  
});