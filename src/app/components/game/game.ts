import { Component, OnInit, inject, signal } from '@angular/core';
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
  quizData = signal([]);
  ngOnInit(): void {
    this.quizService.startQuiz().subscribe({
      next: (res: any) => {
        this.quizData.set(res);
        console.log('quizDataGameComponent', this.quizData());
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
