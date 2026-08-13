import { Component } from '@angular/core';
import { Heading } from '../heading/heading';
import { Button } from '../button/button';

@Component({
  selector: 'app-end-game',
  imports: [Heading, Button],
  templateUrl: './end-game.html',
  styleUrl: './end-game.css',
})
export class EndGame {}
