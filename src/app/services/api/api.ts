import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CountriesAPIResponse } from '../quiz/country.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private httpClient = inject(HttpClient);

  getCountryData() {
    return this.httpClient.get<CountriesAPIResponse>(
      'https://api.restcountries.com/countries/v5?limit=100&response_fields=names,flag,continents,landlocked,population,languages,capitals,currencies,borders,tlds&pretty',
      {
        headers: { Authorization: 'Bearer rc_live_e7cac0676d994f4580bdda4ec42daa6a' },
      },
    );
  }
}
