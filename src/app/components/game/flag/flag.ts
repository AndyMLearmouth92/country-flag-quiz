import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Quiz } from '../../../services/quiz/quiz';
import { Country } from '../../../services/quiz/country.model';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.css',
  standalone: true,
})
export class Flag {
  quizService = inject(Quiz);
  currentCountryData = input<Country>();
  quizFlagImage = computed(() => this.quizService.currentCountryData().flag.url_png);
}
