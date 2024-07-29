import { NgClass } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ForecastItemComponent } from './forecast-item.component';
import { BulkForecastItem } from '../../shared/types/forecast.type';

@Component({
  selector: 'app-forecast',
  template: `
    <mat-card class="forecast-container">
      <mat-card-title>Forecast</mat-card-title>
      <mat-card-content>
        @for (item of response().forecast; track item.query.q) { 
          <app-forecast-item [item]="item.query"/>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .forecast-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      margin: 1rem;
    }
  `,
  imports: [MatCardModule, NgClass, ForecastItemComponent],
  standalone: true,
})
export class ForecastComponent {
  private readonly route = inject(ActivatedRoute);
  readonly response = toSignal(this.route.data, {
    initialValue: [],
  }) as Signal<{forecast: BulkForecastItem[]}>;

}
