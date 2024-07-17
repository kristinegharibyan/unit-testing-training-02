import { NgClass } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  template: `
    <mat-card class="forecast-container">
      <mat-card-title>Forecast</mat-card-title>
      <mat-card-content>
        @for (item of response()['forecast']; track item.query.q) {
          <mat-card
            class="forecast-item"
            [ngClass]="{
              sunny: item.query.current.condition.text === 'Sunny',
              overcast: item.query.current.condition.text === 'Overcast' || item.query.current.condition.text === 'Partly cloudy',
              'light-rain': item.query.current.condition.text === 'Light Rain shower',
            }"
          >
            <mat-card-title>{{ item.query.location.name }}</mat-card-title>
            <mat-card-content>
              <p>
                <span>{{ item.query.current.condition.text }}</span> -
                <span>{{ item.query.current.temp_c }}</span>
              </p></mat-card-content
            >
          </mat-card>
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

    .forecast-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      min-height: 100px;
      margin: 1rem;
    }

    .sunny {
      background-image: url("public/sunny.jpg");
    }

    .overcast {
      background-image: url("public/overcast.png");
    }

    .light-rain {
      background-image: url("public/light-rain.jpg");
    }
  `,
  imports: [MatCardModule, NgClass],
  standalone: true,
})
export class ForecastComponent {
  private readonly route = inject(ActivatedRoute);
  readonly response = toSignal(this.route.data, {
    initialValue: [],
  }) as Signal<any>;

  constructor() {
    console.log(this.response());
  }
}
