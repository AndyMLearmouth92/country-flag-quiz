import { Routes } from '@angular/router';
import { Welcome } from './components/welcome/welcome';
import { Game } from './components/game/game';
import { EndGame } from './components/end-game/end-game';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
  },
  {
    path: 'game',
    component: Game,
  },
  {
    path: 'end-game',
    component: EndGame,
  },
];
