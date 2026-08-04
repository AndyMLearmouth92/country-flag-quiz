import { Component, OnInit, inject, model, signal } from '@angular/core';
import { Flag } from '../flag/flag';
import { Quiz } from '../../services/quiz/quiz';

@Component({
  selector: 'app-game',
  imports: [Flag],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game implements OnInit {
  quizService = inject(Quiz);
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

  onGuessSubmitted(guessSubmitted: string) {
    this.quizService.isUserGuessCorrect(guessSubmitted);
  }
}
