import { Pipe, PipeTransform } from '@angular/core';
import { Score, GameService } from '../services/game-service/game.service';

@Pipe({
  name: 'formatScore'
})
export class FormatScorePipe implements PipeTransform {

  constructor(private gameService: GameService) {}

  transform(value: Score, args?: any): any {
    return this.gameService.formatScore(value);
  }

}
