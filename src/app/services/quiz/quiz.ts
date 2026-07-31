import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class Quiz {
  private apiService = inject(Api);

  startQuiz() {
    return this.apiService
      .getCountryData()
      .pipe(map((response) => this.randomiseCountries(response.data.objects, 10)));
  }

  randomiseCountries(countriesData: any, count: number) {
    const selectedCountries = [];
    const usedIndexes = new Set<number>();

    while (selectedCountries.length < count) {
      const randomIndex = Math.floor(Math.random() * countriesData.length);

      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        selectedCountries.push(countriesData[randomIndex]);
      }
    }
    return selectedCountries;
  }
}
