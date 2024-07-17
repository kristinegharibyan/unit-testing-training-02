import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../environment';
import { WeatherLocation } from '../types/location.type';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private readonly storage = inject(LocalStorageService);
  private readonly env = inject(Environment);
  private readonly http = inject(HttpClient);

  getMyLocations(): string[] {
    return this.storage.getItem<string[]>('myLocations');
  }

  searchLocations(search: string) {
    const params = new HttpParams({
      fromObject: {
        q: search,
        limit: 20,
        key: this.env.apiKey,
      },
    });
    return this.http.get<WeatherLocation[]>(`${this.env.apiUrl}/search.json`, { params });  
  }
}
