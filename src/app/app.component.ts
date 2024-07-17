import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
  ], 
})
export class AppComponent {
  title = 'unit-testing-training-02';
}
