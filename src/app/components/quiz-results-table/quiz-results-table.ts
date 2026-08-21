import { Component, inject } from '@angular/core';
import { Quiz } from '../../services/quiz/quiz';

@Component({
  selector: 'app-quiz-results-table',
  imports: [],
  templateUrl: './quiz-results-table.html',
  styleUrl: './quiz-results-table.css',
})
export class QuizResultsTable {
  quizService = inject(Quiz)
}
