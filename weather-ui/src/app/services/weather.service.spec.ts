// src/app/services/weather.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService, WeatherResponse } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch weather for a city', () => {
    const mockResponse: WeatherResponse = {
      city: 'London',
      temperature: 18.2,
      condition: 'Sunny',
      icon: 'sunny',
    };

    service.getWeather('London').subscribe((res) => {
      expect(res.city).toBe('London');
      expect(res.temperature).toBe(18.2);
    });

    const req = httpMock.expectOne('http://localhost:8000/weather?city=London');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});