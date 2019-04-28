import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupPageComponentComponent } from './pages/setup-page-component/setup-page-component.component';
import { InProgressPageComponentComponent } from './pages/in-progress-page-component/in-progress-page-component.component';
import { GameService } from './services/game-service/game.service';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import { GameScorePageComponent } from './pages/game-score-page/game-score-page.component';
import { FormatScorePipe } from './pipes/format-score.pipe';
import { CancelGameButtonComponent } from './components/cancel-game-button/cancel-game-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupPageComponentComponent,
    InProgressPageComponentComponent,
    ScoresPageComponent,
    GameScorePageComponent,
    FormatScorePipe,
    CancelGameButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
