import { Component, inject, signal } from '@angular/core';
import { Heading } from '../heading/heading';
import { QUIZ_REGIONS } from '../../constants/country-lookup';
import { Button } from '../button/button';
import { Quiz } from '../../services/quiz/quiz';

@Component({
  selector: 'app-welcome',
  imports: [Heading, Button],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  quizService = inject(Quiz);
  quizRegions = QUIZ_REGIONS;

  ngOnInit(): void {}

  selectContinent(chosenRegion: string) {
    this.quizService.startQuiz(chosenRegion).subscribe({
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
