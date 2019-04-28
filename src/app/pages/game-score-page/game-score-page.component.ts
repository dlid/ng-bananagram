import { Component, OnInit } from '@angular/core';
import { GameRound, GameService } from 'src/app/services/game-service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-score-page',
  templateUrl: './game-score-page.component.html',
  styleUrls: ['./game-score-page.component.scss']
})
export class GameScorePageComponent implements OnInit {

  rounds: GameRound[];
  players: string[];
  totals: number[];
  endGameText: string;
  playersInLead: number[] = [];

  constructor(private gameService: GameService,
    private router: Router) { }

  ngOnInit() {
    this.rounds = this.gameService.game.rounds;
    this.players = this.gameService.game.participants;

    const totals = this.players.map(x => 0);
    
    var maxScore = 0;
    this.rounds.forEach(round => {
      round.scores.forEach((score, index) => {
        totals[index] += this.gameService.formatScore(score);
        if (totals[index] > maxScore) {
          maxScore = totals[index];
        }
      })
    });
    this.totals = totals;
    
    let winners = [];
    this.totals.forEach((score, ix) => {
      if (score === maxScore) {
        winners.push(this.players[ix]);
        this.playersInLead.push(ix);
      }
    })
    
    let finishGameText = "";

    if (winners.length == 1) {
      finishGameText = `End game with ${winners[0]} as winner`;
    } else if (winners.length > 1) {
      finishGameText = `End game in a draw!`;
    }

    this.endGameText = finishGameText;

    console.warn("WINNERS", winners);

  }

  newRound() {
    this.gameService.game.startRound();
    this.router.navigate(['/inprogress']);
  }

  endGame() {
    this.gameService.game.endGame();
    this.router.navigate(['/setup']);
  }

  cancelGame() {
    if (confirm("Really cancel this game? All progress will be lost")) {
      this.gameService.game.endGame(true);
      this.router.navigate(['/setup']);
    }
  }

}
