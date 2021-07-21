import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html'
})
export class TemperatureConverterComponent {
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
  }

  from: string;
  conversionInput: number;
  temperature: any;
  error: boolean;
  convert() {
    this.temperature = null;
    if (!!this.conversionInput && !!this.from) {
      this.http.get<Temperature>(this.baseUrl + 'weatherforecast/?number=' + this.conversionInput + '&from=' + this.from).subscribe((result: any) => {
        this.temperature = result;
      }), () => { this.error = true};
    }
  }
}

export class Temperature {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  input: number
}
