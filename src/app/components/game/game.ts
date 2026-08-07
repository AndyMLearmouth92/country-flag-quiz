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
export class Game implements OnInit {
  quizService = inject(Quiz);
  questionNumber = computed(() => this.quizService.index() + 1);
  currentGuess = signal('');
  ngOnInit(): void {
    this.quizService.startQuiz().subscribe({
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  submittedGuess() {
    this.quizService.isUserGuessCorrect(this.currentGuess());
    this.currentGuess.set('');
  }
}
