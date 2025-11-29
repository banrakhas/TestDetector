// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherResponse {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.baseUrl}/weather`, {
      params: { city },
    });
  }
 

}