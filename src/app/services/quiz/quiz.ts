import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { Api } from '../api/api';
import { COUNTRY_LOOKUP } from '../../constants/country-lookup';

@Injectable({
  providedIn: 'root',
})
export class Quiz {
  private apiService = inject(Api);
  quizDataCountries = signal<any[]>([]);
  index = signal(0);
  currentCountryData = computed(() => this.quizDataCountries()[this.index()]);
  correctlyAnsweredQuestions = signal(0);
  maxNumberOfGuesses = 5;
  incorrectGuesses = signal<string[]>([]);
  borderingCountries = computed(() =>
    this.formatList(
      this.currentCountryData().borders.map(
        (borderingCountry: string) => COUNTRY_LOOKUP[borderingCountry],
      ),
    ),
  );
  capitalCities = computed(() =>
    this.formatList(
      this.currentCountryData().capitals.flatMap((capitalCity: any) => capitalCity.name),
    ),
  );
  continents = computed(() => this.formatList(this.currentCountryData().continents));

  currencies = computed(() =>
    this.formatList(this.currentCountryData().currencies.flatMap((currency: any) => currency.name)),
  );

  languages = computed(() =>
    this.formatList(this.currentCountryData().languages.flatMap((language: any) => language.name)),
  );

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
    this.quizDataCountries.set(selectedCountries);
    return selectedCountries;
  }

  isUserGuessCorrect(userGuess: string) {
    const country = this.currentCountryData();

    const correctCountryNames = [
      country.names.common,
      country.names.official,
      ...country.names.alternates,
    ];

    const isCorrect = correctCountryNames.some(
      (correctName) => userGuess.trim().toLowerCase() === correctName.trim().toLowerCase(),
    );

    if (isCorrect) {
      this.correctlyAnsweredQuestions.update((n) => n + 1);
      this.index.update((i) => i + 1);
      this.incorrectGuesses.set([]);
    } else {
      this.incorrectGuesses.update((guesses) =>
        guesses.includes(userGuess) ? guesses : [...guesses, userGuess],
      );
      this.guessesExpired();
    }
  }

  guessesExpired() {
    if (this.incorrectGuesses().length === this.maxNumberOfGuesses) {
      this.index.update((n) => n + 1);
      this.incorrectGuesses.set([]);
    }
  }

  formatList(items: string[]): string {
    if (items.length === 0) {
      return '';
    }
    if (items.length === 1) {
      return items[0];
    }
    if (items.length === 2) {
      return `${items[0]} and ${items[1]}`;
    }
    return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
  }
}
