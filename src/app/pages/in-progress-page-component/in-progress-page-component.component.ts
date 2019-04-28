import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService, GameRound } from 'src/app/services/game-service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-progress-page-component',
  templateUrl: './in-progress-page-component.component.html',
  styleUrls: ['./in-progress-page-component.component.scss']
})
export class InProgressPageComponentComponent implements OnInit, OnDestroy {

  participants: string;
  round: GameRound;
  roundNumber: number;
  roundStart = 0;
  timer;
  durationText = '00:00';

  constructor(private gameService: GameService,
    private router: Router) { }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.participants = this.gameService.game.participants.join(', ');


    console.warn("active round", this.gameService.game.activeRound);

    if (!this.gameService.game.activeRound) {
      this.gameService.game.startRound();
    }

    this.roundStart = this.gameService.game.activeRound.start

    this.roundNumber = this.gameService.game.rounds.length;

    this.timer = setInterval(() => {
      var d = (new Date()).getTime();
      this.durationText = "" + this.msToTime(d - this.roundStart);
    }, 350);


  }

  msToTime(ms: number) {
    var seconds = (ms/1000);
    var minutes = parseInt(<any>(seconds / 60), 10);
    seconds = parseInt(<any>(seconds % 60), 10);
    var hours = parseInt(<any>(minutes / 60), 10);
    minutes = minutes%60;
    
    return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
}

  pad(value: number) {
    return String("00" + value).slice(-2)
  }

  endGame() {
    if (confirm("Really cancel this game? All progress will be lost")) {
      this.gameService.game.endGame(true);
      this.router.navigate(['/setup']);
    }
  }

  continue() {
    this.gameService.game.endRound();
    this.router.navigate(['/scores']);    
  }

}
