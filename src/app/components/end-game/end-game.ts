import { Component, inject } from '@angular/core';
import { Heading } from '../heading/heading';
import { Button } from '../button/button';
import { Quiz } from '../../services/quiz/quiz';

@Component({
  selector: 'app-end-game',
  imports: [Heading, Button],
  templateUrl: './end-game.html',
  styleUrl: './end-game.css',
})
export class EndGame {
  quizService = inject(Quiz)
  score = this.quizService.correctlyAnsweredQuestions()
  
  quizEndMessage() {
    if (this.score < 3) {
      return 'Better luck next time.';
    }
    if (this.score < 6) {
      return 'Ok effort, but more practice needed.';
    }
    if (this.score < 8) {
      return 'Good effort.';
    }
    if (this.score < 10) {
      return 'Great effort.';
    }
    return 'Perfect score!';
  }
}
