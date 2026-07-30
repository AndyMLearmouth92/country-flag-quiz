import { Component } from '@angular/core';
import { Game } from '../game/game';

@Component({
  selector: 'app-hero',
  imports: [Game],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
