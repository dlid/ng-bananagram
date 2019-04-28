import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './services/game-service/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'this demo';
  playerCount = 0;

  participantSubscription: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {

    this.playerCount = this.gameService.game.participants.length;

    this.participantSubscription = this.gameService.game.participants$.subscribe(participants => {
      this.playerCount = participants.length;
    })

  }

  ngOnDestroy() {
    this.participantSubscription.unsubscribe();
  }

}
