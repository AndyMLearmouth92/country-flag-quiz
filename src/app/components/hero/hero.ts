import { Component } from '@angular/core';
import { Game } from '../game/game';
import { Welcome } from '../welcome/welcome';

@Component({
  selector: 'app-hero',
  imports: [Game],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
