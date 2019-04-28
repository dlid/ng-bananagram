import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-page-component',
  templateUrl: './setup-page-component.component.html',
  styleUrls: ['./setup-page-component.component.scss']
})
export class SetupPageComponentComponent implements OnInit {

  names: string[];
  selectedNames: string[] = [];

  constructor(private gameService: GameService,
    private router: Router) { }

  ngOnInit() {
    this.names = this.gameService.names;

    if (this.gameService.game.isRunning) {
      this.router.navigate( ['/inprogress']);
    }

  }


  toggleName(e: MouseEvent, name: string) {
    const checked = (<HTMLInputElement>e.target).checked;

    const existing = this.selectedNames.findIndex(n => n === name);
    console.log("e", name, existing, checked);
    if (checked) {
      if (existing === -1) {
        this.selectedNames.push(name);
      }
    } else if (existing !== -1) {
      this.selectedNames.splice(existing, 1);
    }

  }

  removeNames() {
    if (this.selectedNames.length > 0) {
      this.gameService.removeNames(this.selectedNames);
      this.names = this.gameService.names;
      this.selectedNames = [];
    }
  }

  addName() {
    const name = prompt('Enter the new name');
    if (name) {
     this.gameService.addName(name);
     this.names = this.gameService.names;
    }
  }

  start() {
    this.gameService.game.newGame(this.selectedNames);
    this.router.navigate(['/inprogress']);
  }

}