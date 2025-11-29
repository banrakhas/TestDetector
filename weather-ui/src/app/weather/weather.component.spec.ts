// src/app/weather/weather.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [{ provide: WeatherService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherServiceSpy = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
    fixture.detectChanges();
  });

  it('should fetch weather and set data', () => {
    const mockResponse = {
      city: 'London',
      temperature: 18.2,
      condition: 'Sunny',
      icon: 'sunny',
    };
    weatherServiceSpy.getWeather.and.returnValue(of(mockResponse));

    component.fetchWeather();

    // `of()` emits synchronously so assertions can be immediate
    expect(component.loading).toBeFalse();
    expect(component.data?.city).toBe('London');
  });

  it('should handle error when service fails', () => {
    weatherServiceSpy.getWeather.and.returnValue(
      throwError(() => new Error('API error'))
    );

    component.fetchWeather();

    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Failed to fetch weather');
  });
});
