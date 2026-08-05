import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Quiz } from '../../services/quiz/quiz';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.css',
  standalone: true,
})
export class Flag {
  quizService = inject(Quiz);
  questionNumber = computed(() => this.quizService.index() + 1);
  currentCountryData = input<any>();
  currentGuess = signal('');
  guessSubmitted = output<string>();
  quizFlagImage = computed(() => this.currentCountryData().flag.url_png);
  correctCountry = computed(() => this.currentCountryData().names.official);

  submitGuess() {
    this.guessSubmitted.emit(this.currentGuess());
    this.currentGuess.set('');
  }
}
