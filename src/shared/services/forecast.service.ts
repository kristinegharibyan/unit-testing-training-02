import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Environment } from "../environment";
import { ForecastApiResponse } from "../types/forecast.type";
import { WeatherLocation } from "../types/location.type";

@Injectable({ providedIn: 'root' })
export class ForecastService {
    private readonly http = inject(HttpClient);
    private readonly env = inject(Environment);

    getBulkForecast(locations: WeatherLocation[]) {
        const query = {
          locations: locations.map((location) => ({
            q: `${location.lat},${location.lon}`,
          })),
        };
        const params = new HttpParams({
            fromObject: {
                key: this.env.apiKey,
                q: 'bulk',
            },
        });
        return this.http.post<ForecastApiResponse>(`${this.env.apiUrl}/current.json`, query, {params});
    }
}