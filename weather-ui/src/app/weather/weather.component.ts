// src/app/weather/weather.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherResponse } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class WeatherComponent {
  cities = ['London', 'Paris', 'New York', 'Mumbai'];
  selectedCity = this.cities[0];

  loading = false;
  error: string | null = null;
  data: WeatherResponse | null = null;

  constructor(private weatherService: WeatherService) {}

  fetchWeather() {
    this.loading = true;
    this.error = null;
    this.data = null;
    this.weatherService.getWeather(this.selectedCity).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch weather';
        this.loading = false;
      },
    });
  }
}
