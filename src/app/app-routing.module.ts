import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupPageComponentComponent } from './pages/setup-page-component/setup-page-component.component';
import { InProgressPageComponentComponent } from './pages/in-progress-page-component/in-progress-page-component.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import { GameScorePageComponent } from './pages/game-score-page/game-score-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/setup'
  },
  {
    path: 'setup',
    component: SetupPageComponentComponent
  },
  {
    path: 'inprogress',
    component: InProgressPageComponentComponent
  },
  {
    path: 'scores/:playerIndex',
    component: ScoresPageComponent
  },
  {
    path: 'scores',
    redirectTo: '/scores/0'
  },
  {
    path: 'gamescore',
    component: GameScorePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
