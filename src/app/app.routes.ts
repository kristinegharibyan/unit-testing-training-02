import { Routes } from '@angular/router';
import { LocationsComponent } from './components/locations.component';
import { ForecastComponent } from './components/forecast.component';
import { forecastResolver } from '../shared/resolvers/forecast.resolver';

export const routes: Routes = [
    { path: 'locations', component: LocationsComponent },  
    { path: '', redirectTo: 'forecast', pathMatch: 'full' },
    { path: 'forecast', component: ForecastComponent, resolve: { forecast: forecastResolver } },
];
