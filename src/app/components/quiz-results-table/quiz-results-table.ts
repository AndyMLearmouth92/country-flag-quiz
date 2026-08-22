import { Component, inject } from '@angular/core';
import { Quiz } from '../../services/quiz/quiz';
import { Heading } from '../heading/heading';
import { Router } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'app-quiz-results-table',
  imports: [Heading, Button],
  templateUrl: './quiz-results-table.html',
  styleUrl: './quiz-results-table.css',
})
export class QuizResultsTable {
  quizService = inject(Quiz)
  router = inject(Router)

  backToEndGame(){
    this.router.navigate(['/end-game'])
  }
}
