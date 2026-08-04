import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class Quiz {
  private apiService = inject(Api);
  quizDataCountries = signal<any[]>([]);
  index = signal(0);
  currentCountryData = computed(() => this.quizDataCountries()[this.index()]);
  correctlyAnsweredQuestions = signal(0);
  numberOfGuesses = signal(0);
  maxNumberOfGuesses = 5;
  incorrectGuesses = signal<string[]>([]);

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

    correctCountryNames.some((correctName) => {
      if (userGuess === correctName) {
        this.correctlyAnsweredQuestions.update(
          (numberOfCorrectlyAnsweredQuestions) => numberOfCorrectlyAnsweredQuestions + 1,
        );
        this.index.update((numberOfCorrectQuestions) => numberOfCorrectQuestions + 1);
        this.numberOfGuesses.set(0);
      } else {
        this.numberOfGuesses.update((currNumberOfGuesses) => currNumberOfGuesses + 1);
        this.incorrectGuesses.update((guesses) =>
          guesses.includes(userGuess) ? guesses : [...guesses, userGuess],
        );
      }
    });
  }
}
