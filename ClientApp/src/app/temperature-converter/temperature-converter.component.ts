import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  form = new FormGroup({
    conversionInput: new FormControl('', [Validators.required, Validators.pattern("^-?[0-9]*(?:\.[0-9]{0,4})?$")]),
    conversionFrom: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  convert() {
    this.temperature = null;
    this.conversionInput = this.form.controls['conversionInput'].value;
    this.from = this.form.controls['conversionFrom'].value;
    if (!!this.conversionInput && !!this.from) {
      this.http.get<Temperature>(this.baseUrl + 'weatherforecast/?number=' + this.conversionInput + '&from=' + this.from).subscribe((result: any) => {
        this.temperature = result;
      }), () => { this.error = true };
    }
  }
}

export class Temperature {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  input: number;
}
