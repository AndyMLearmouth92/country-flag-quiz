import { Component, inject } from '@angular/core';
import { Heading } from '../heading/heading';
import { Button } from '../button/button';
import { Quiz } from '../../services/quiz/quiz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  imports: [Heading, Button],
  templateUrl: './end-game.html',
  styleUrl: './end-game.css',
})
export class EndGame {
  quizService = inject(Quiz)
  router = inject(Router)
  questionsCorrect = this.quizService.correctAnswers()
  score = this.quizService.score()
  
  quizEndMessage() {
    if (this.score < 18) {
      return 'Better luck next time.';
    }
    if (this.score < 36) {
      return 'Ok effort, but more practice needed.';
    }
    if (this.score < 48) {
      return 'Good effort.';
    }
    if (this.score < 60) {
      return 'Great effort.';
    }
    return 'Perfect score!';
  }

  playQuizAgain(){
    this.quizService.startQuiz(this.quizService.chosenRegion()).subscribe({
      next: () => {
        this.quizService.index.set(0)
        this.quizService.correctAnswers.set(0)
        this.router.navigate(['/game']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete play quiz again');
      },
    })
  }

  playQuizDifferentContinent(){
    this.router.navigate([''])
  }

  showQuizResults(){
    this.router.navigate(['/game-results'])
  }
}
