import { Component } from '@angular/core';
import { Heading } from '../heading/heading';
import { QUIZ_CONTINENTS } from '../../constants/country-lookup';

@Component({
  selector: 'app-welcome',
  imports: [Heading],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  quizContinents = QUIZ_CONTINENTS;
}
