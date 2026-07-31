import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.css',
  standalone: true,
})
export class Flag {
  quizData = input<any>();
}
