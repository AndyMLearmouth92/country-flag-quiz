import { Component } from '@angular/core';
import { Flag } from '../flag/flag';

@Component({
  selector: 'app-game',
  imports: [Flag],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {}
