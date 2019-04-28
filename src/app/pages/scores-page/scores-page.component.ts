import { Component, OnInit } from '@angular/core';
import { GameService, Score } from 'src/app/services/game-service/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.scss']
})
export class ScoresPageComponent implements OnInit {

  plus = 0;
  penalties = 0;
  players: string[];
  scores: Score[];
  scoreStatus = null;
  expandedPlayerIndex: number;
  canContinue = false;
  roundNumber: number;
  isSAOLOpen = false;
  saolUrl = "about:blank";

  constructor(private route: ActivatedRoute, 
    private gameService: GameService,
    private router: Router) { }

  ngOnInit() {

    this.roundNumber = this.gameService.game.rounds.length;

    this.players = this.gameService.game.participants;
    
    this.scores = this.gameService.game.activeRound.scores;

    this.route.params.subscribe(parameters => {
      this.expandedPlayerIndex = parseInt(parameters.playerIndex, 10);
      if (this.scores[this.expandedPlayerIndex] === null) {
        this.gameService.game.setScore(this.expandedPlayerIndex, {
          plus: 0,
          minus: 0
        });
      }
      this.updateCanContinue();

    })

  }

  saol(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.isSAOLOpen = true;
      const elm = e.target as HTMLInputElement;
      const frame = document.querySelector('iframe.saol');
      if (frame) {
        this.saolUrl = `https://svenska.se/tre/?sok=${encodeURIComponent(elm.value)}&pz=1`
        frame.setAttribute('src', this.saolUrl);
      }

      
    }
  } 

  getPlayerScore(playerIndex: number): number {
    const score = this.scores[playerIndex];
    if (score) {
      const sum = score.plus - score.minus;
      if (sum < 0) {
        return 0;
      }
      return sum;
    }
    
    return null;
  }


  changePenalty(playerIndex: number, add: number) {
    const score = this.scores[playerIndex];
    if (score.minus + add >= 0) {
      score.minus += add;
      this.gameService.game.setScore(playerIndex, score);
      this.updateCanContinue();
    }
  }

  updateCanContinue() {

    const unsetScores = this.scores.findIndex(f => f === null);
    this.canContinue = unsetScores === -1;

  }

  changePlus(playerIndex: number, add: number) {
    const score = this.scores[playerIndex];
    if (score.plus + add >= 0) {
      score.plus += add;
      this.gameService.game.setScore(playerIndex, score);
      this.updateCanContinue();

    }
  }

  endGame() {
    if (confirm("Really cancel this game? All progress will be lost")) {
      this.gameService.game.endGame(true);
      this.router.navigate(['/setup']);
    }
  }

  continue() {
    this.gameService.game.closeRound();
    this.router.navigate(['/gamescore']);
  }
 
}
