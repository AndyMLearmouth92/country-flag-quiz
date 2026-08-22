import { Routes } from '@angular/router';
import { Welcome } from './components/welcome/welcome';
import { Game } from './components/game/game';
import { EndGame } from './components/end-game/end-game';
import { gameGuard } from './guards/game.guard';
import { QuizResultsTable } from './components/quiz-results-table/quiz-results-table';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
  },
  {
    path: 'game',
    component: Game,
    canActivate: [gameGuard]
  },
  {
    path: 'end-game',
    component: EndGame,
    canActivate: [gameGuard]
  },

  {
    path: 'game-results',
    component: QuizResultsTable,
    canActivate: [gameGuard]
  },
];
