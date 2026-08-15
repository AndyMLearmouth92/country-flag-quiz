import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CountriesAPIResponse } from '../quiz/country.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private httpClient = inject(HttpClient);

  getCountryData(chosenRegion: string) {
    const baseUrl = `https://api.restcountries.com/countries/v5?limit=100&response_fields=names,flag,continents,landlocked,population,languages,capitals,currencies,borders,tlds&pretty`;
    const url = chosenRegion === 'World' ? baseUrl : baseUrl + `&region=${chosenRegion}`;
    return this.httpClient.get<CountriesAPIResponse>(url, {
      headers: { Authorization: 'Bearer rc_live_e7cac0676d994f4580bdda4ec42daa6a' },
    });
  }
}
