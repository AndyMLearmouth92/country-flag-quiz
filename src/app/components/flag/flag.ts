import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.css',
  standalone: true,
})
export class Flag {
  quizData = input<any>();
  index = signal(0);
  currentCountry = computed(() => this.quizData()[this.index()]);
  quizFlagImage = computed(() => this.quizData()[this.index()].flag.url_png);
}
