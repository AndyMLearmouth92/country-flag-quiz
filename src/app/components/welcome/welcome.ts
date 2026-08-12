import { Component } from '@angular/core';
import { Heading } from '../heading/heading';
import { QUIZ_CONTINENTS } from '../../constants/country-lookup';
import { Button } from '../button/button';

@Component({
  selector: 'app-welcome',
  imports: [Heading, Button],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  quizContinents = QUIZ_CONTINENTS;
}
