import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private httpClient = inject(HttpClient);

  getCountryData() {
    return this.httpClient.get<any>('https://api.restcountries.com/countries/v5?limit=100', {
      headers: { Authorization: 'Bearer rc_live_e7cac0676d994f4580bdda4ec42daa6a' },
    });
  }
}
