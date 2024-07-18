import { Component, input } from '@angular/core';
import { ForecastQuery } from '../../shared/types/forecast.type';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forecast-item',
  template: `
    <mat-card
      class="forecast-item"
      [ngClass]="{
              sunny: item().current.condition.text === 'Sunny',
              overcast: item().current.condition.text === 'Overcast' || item().current.condition.text === 'Partly cloudy',
              'light-rain': item().current.condition.text === 'Light Rain shower',
            }"
    >
      <mat-card-title>{{ item().location.name }}</mat-card-title>
      <mat-card-content>
        <p>
          <span>{{ item().current.condition.text }}</span> -
          <span>{{ item().current.temp_c }}</span>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
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
  standalone: true,
  imports: [MatCardModule, NgClass],
})
export class ForecastItemComponent {
  item = input.required<ForecastQuery>();
}
