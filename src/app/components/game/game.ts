import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Flag } from './flag/flag';
import { Quiz } from '../../services/quiz/quiz';
import { Input } from './input/input';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { List } from './list/list';

@Component({
  selector: 'app-game',
  imports: [Flag, Input, Button, Heading, List],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  quizService = inject(Quiz);
  questionNumber = computed(() => this.quizService.index() + 1);
  currentGuess = signal('');
  isButtonDisabled = computed(() => !this.currentGuess().trim());
  invalidInputError = signal(false);

  guessChanged(guess: string) {
    this.currentGuess.set(guess);
    this.invalidInputError.set(false);
  }

  submittedGuess() {
    const guessesClearsInput = this.quizService.isUserGuessCorrect(this.currentGuess());
    this.invalidInputError.set(guessesClearsInput === 'duplicate');

    if (guessesClearsInput !== 'duplicate') {
      this.currentGuess.set('');
    }
  }
}
