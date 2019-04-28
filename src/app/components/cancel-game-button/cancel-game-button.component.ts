import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-game-button',
  templateUrl: './cancel-game-button.component.html',
  styleUrls: ['./cancel-game-button.component.scss']
})
export class CancelGameButtonComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
  }

  cancelGame() {
    if (confirm("Really cancel this game? All progress will be lost")) {
      this.gameService.game.endGame(true);
      this.router.navigate(['/setup']);
    }
  }

}
