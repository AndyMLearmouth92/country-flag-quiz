import { Component, inject, input, output } from '@angular/core';
import { Quiz } from '../../../services/quiz/quiz';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  quizService = inject(Quiz);
  currentGuess = input('');
  guessChanged = output<any>();

  updateGuess(event: Event) {
    const input = event.target as HTMLInputElement;
    this.guessChanged.emit(input.value);
  }
}
