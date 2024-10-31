import { Component, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { LocationsActions } from '../../shared/store/locations/locations.actions';
import { locationsFeature } from '../../shared/store/locations/locations.feature';
import { WeatherLocation } from '../../shared/types/location.type';

@Component({
  selector: 'app-locations',
  template: `
    <mat-card>
      <mat-card-title>Locations</mat-card-title>
      <mat-card-content>
        <mat-form-field class="full-width">
          <mat-label>Search for a location</mat-label>
          <input matInput placeholder="Location" [(ngModel)]="query" />
        </mat-form-field>
        @if (vm().loading) {
          <mat-spinner mode="indeterminate"/>
         } @else if (locations().length) {
          <table mat-table [dataSource]="locations()" class="mat-elevation-z8">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let element">{{ element.name }}</td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="region">
              <th mat-header-cell *matHeaderCellDef>Region</th>
              <td mat-cell *matCellDef="let element">{{ element.region }}</td>
            </ng-container>

            <!-- Country Column -->
            <ng-container matColumnDef="country">
              <th mat-header-cell *matHeaderCellDef>Country</th>
              <td mat-cell *matCellDef="let element">{{ element.country }}</td>
            </ng-container>
            <!-- Country Column -->
            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <td mat-cell *matCellDef="let element">
                @if (element.favorite) {
                <button
                  id="favorite-button"
                  mat-icon-button
                  matTooltip="Add to favorites"
                  (click)="addToFavorites(element)"
                >
                  <mat-icon>add</mat-icon>
                </button>
                } @else {
                <button
                  mat-icon-button
                  matTooltip="Remove from favorites"
                  (click)="removeFromFavorites(element)"
                >
                  <mat-icon>remove</mat-icon>
                </button>
                }
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .full-width {
        width: 100%;
    }

    mat-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      margin: 1rem;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  standalone: true,
})
export class LocationsComponent {
  private readonly store = inject(Store);

  vm = this.store.selectSignal(locationsFeature.selectLocationsState);
  locations = this.store.selectSignal(locationsFeature.selectLocationResults);
  query = model<string>('');
  displayedColumns: Array<keyof WeatherLocation | 'action'> = [
    'name',
    'region',
    'country',
    'action',
  ];

  searchLocations = effect(
    () => {
      const query = this.query();
      if (query.length) {
        this.store.dispatch(
          LocationsActions.searchLocations({ query: this.query() })
        );
      }
    },
    { allowSignalWrites: true }
  );

  addToFavorites(location: WeatherLocation) {
    this.store.dispatch(LocationsActions.addToFavorites({ location }));
  }

  removeFromFavorites(location: WeatherLocation) {
    this.store.dispatch(LocationsActions.removeFromFavorites({ location }));
  }
}
