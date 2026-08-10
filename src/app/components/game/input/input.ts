import { Component, computed, inject, input, output } from '@angular/core';
import { Quiz } from '../../../services/quiz/quiz';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  quizService = inject(Quiz);
  currentGuess = input<string>('');
  guessChanged = output<string>();
  invalidInputError = input(false);

  updateGuess(event: Event) {
    const input = event.target as HTMLInputElement;
    this.guessChanged.emit(input.value);
  }
}
