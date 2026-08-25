import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { Api } from '../api/api';
import { COUNTRY_LOOKUP } from '../../constants/country-lookup';
import { Router } from '@angular/router';
import { QuizResult } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class Quiz {
  private apiService = inject(Api);
  private router = inject(Router);
  quizDataCountries = signal<any[]>([]);
  index = signal(9);
  quizStarted = signal(false)
  currentCountryData = computed(() => this.quizDataCountries()[this.index()]);
  correctAnswers = signal(0);
  score = signal(0);
  maxNumberOfGuesses = 6;
  incorrectGuesses = signal<string[]>([]);
  chosenRegion = signal<string>('')
  quizResult = signal<QuizResult[]>([])
  borderingCountries = computed(() =>
    this.formatList(
      this.currentCountryData().borders.map(
        (borderingCountry: string) => COUNTRY_LOOKUP[borderingCountry],
      ),
    ),
  );
  continents = computed(() => this.currentCountryData().continents);
  allTimeHighScore = signal<number | null>(null);
  isNewHighScore = signal(false);
  isLoading = signal(false)

  languages = computed(() =>
    this.currentCountryData().languages.map((language: any) => language.name),
  );

  currencies = computed(() =>
    this.currentCountryData().currencies.map((currency: any) => currency.name),
  );

  capitalCities = computed(() =>
    this.currentCountryData().capitals.map((capital: any) => capital.name),
  );

  clues = computed(() => [
    this.chosenRegion() === 'World' ? {
      label: this.continents.length > 1 ? 'Continents' : 'Continent',
      value: this.formatList(this.currentCountryData().continents),
    }
    : 
    { 
      label: 'Subregion',
      value: this.currentCountryData().subregion
    },
    {
      label:
        this.currentCountryData().borders.length === 1
          ? 'Bordering Country'
          : 'Bordering Countries',
      value: this.formatList(
        this.currentCountryData().borders.map((border: string) => COUNTRY_LOOKUP[border]),
      ),
    },
    {
      label: this.languages().length > 1 ? 'Language' : 'Languages',
      value: this.formatList(this.languages()),
    },
    {
      label: this.currencies().length > 1 ? 'Currency' : 'Currencies',
      value: this.formatList(this.currencies()),
    },
    {
      label: 'Capital City',
      value: this.formatList(this.capitalCities()),
    },
  ]);

  visibleClues = computed(() =>
    this.clues()
      .slice(0, this.incorrectGuesses().length)
      .map((clue) => `${clue.label}: ${clue.value}`),
  );

  startQuiz(chosenRegion: string) {
    this.chosenRegion.set(chosenRegion);
    this.quizStarted.set(true);
    this.isLoading.set(true);
    this.getHighScore();
  
    return this.apiService.getCountryData(chosenRegion).pipe(
      map((response) => this.randomiseCountries(response.data.objects, 10)),
      tap((countries) => {
        this.quizDataCountries.set(countries);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        throw error;
      })
    );
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
    console.log('Selected Countries', selectedCountries);
    return selectedCountries;
  }

  isUserGuessCorrect(userGuess: string) {
    const santisedGuess = userGuess.trim().toLowerCase();
    if (!santisedGuess || this.incorrectGuesses().includes(santisedGuess)) {
      return 'duplicate';
    }
    const country = this.currentCountryData();

    const correctCountryNames = [
      country.names.common,
      country.names.official,
      ...country.names.alternates,
    ];

    const isCorrect = correctCountryNames.some(
      (correctName) => santisedGuess === correctName.trim().toLowerCase(),
    );

    if (isCorrect) {
      this.score.update((s) => s + (this.maxNumberOfGuesses - this.incorrectGuesses().length))
      this.mapQuizResult(true)
      this.correctAnswers.update((n) => n + 1);
      this.index.update((i) => i + 1);
      this.incorrectGuesses.set([]);
      this.hasQuizEnded();
      return 'correct';
    } else {
      this.incorrectGuesses.update((guesses) =>
        guesses.includes(santisedGuess) ? guesses : [...guesses, santisedGuess],
      );
      this.guessesExpired();
      this.hasQuizEnded();
      return 'incorrect';
    }
  }

  guessesExpired() {
    if (this.incorrectGuesses().length === this.maxNumberOfGuesses) {
      this.mapQuizResult(false)
      this.index.update((n) => n + 1);
      this.incorrectGuesses.set([]);
    }
  }

  formatList(items: string[]): string {
    if (items.length === 0) {
      return 'None';
    }
    if (items.length === 1) {
      return items[0];
    }
    if (items.length === 2) {
      return `${items[0]} and ${items[1]}`;
    }
    return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
  }

  hasQuizEnded() {
    if(this.index() > 9){
      this.checkAndSetHighScore()
      this.router.navigate(['end-game']);
    }
  }

  mapQuizResult(isCorrect: boolean){
    this.quizResult.update((questionResult) => [...questionResult,
      {
        countryName: this.currentCountryData().names.common,
        isCorrect,
        numberOfGuesses: this.incorrectGuesses().length,
        questionPoints: this.maxNumberOfGuesses - this.incorrectGuesses().length,
        flag: this.currentCountryData().flag.url_png
      }
    ])
  }

  getHighScore() {
    const storedHighScore = localStorage.getItem(
      `${this.chosenRegion()}HighScore`,
    );
  
    this.allTimeHighScore.set(
      storedHighScore ? Number(storedHighScore) : null,
    );
  }
  
  checkAndSetHighScore() {
    const currentHighScore = this.allTimeHighScore() ?? 0;
  
    if (this.score() > currentHighScore) {
      localStorage.setItem(
        `${this.chosenRegion()}HighScore`,
        this.score().toString(),
      );
  
      this.allTimeHighScore.set(this.score());
      this.isNewHighScore.set(true);
    } else {
      this.isNewHighScore.set(false);
    }
  }
}
