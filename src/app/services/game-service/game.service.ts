import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private nameList: string[] = [];
  private nameSubject = new Subject<string[]>();

  private currentGame: Game;

  constructor() { 
    this.currentGame = new Game(this);
    const names = this.readLocalstorage<string[]>('names');
    if (names) {
      this.nameList = names;
      this.nameSubject.next(this.nameList);
    }
  }

  get names(): string[] {
    return this.nameList;
  }

  get names$(): Observable<string[]> {
    return this.nameSubject.asObservable();
  }
  
  get game() {
    return this.currentGame;
  }

  addName(name: string){
    this.nameList.push(name);
    this.nameList.sort();
    this.nameSubject.next(this.nameList);
    localStorage.setItem('names', JSON.stringify(this.nameList));
  }

  removeNames(names: string[]) {
    names.forEach(name => {
      const index = this.nameList.findIndex(n => n === name);
      if (index !== -1) {
        this.nameList.splice(index,1);
      }
    })
    this.nameSubject.next(this.nameList);
    localStorage.setItem('names', JSON.stringify(this.nameList));
  }

  
  public readLocalstorage<T>(key: string): T {
    const existing = localStorage.getItem(key);
    if (existing) {
      let data;
      try {
        data = JSON.parse(existing);
        if (data) {
          return <T>data;
        }
      } catch {}
    }
    return null;
  }

  
  formatScore(value: Score) {
    if (!value) {
      return 0;
    }

    if (value.plus - value.minus < 0) {
      return 0;
    }

    return value.plus - value.minus;
  }

}

class Game {
  private participantList: string[] = [];
  private participantSubject = new Subject<string[]>();
  private roundList: GameRound[] = [];
  private roundSubject = new Subject<GameRound[]>();

  private gameStart = (new Date()).getTime();
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.load();
  }

  newGame(participants: string[]) {
    this.addParticipants(participants);
    this.roundList = [];
    this.roundSubject.next(this.roundList);
  }

  get isRunning(): boolean {
    return !!(localStorage.getItem('participants') || 
    localStorage.getItem('rounds'));
  }

  endGame(cancelled = false) {

    if (!cancelled) {
      const maxHistory = 50;
      const gameSummary = {
        d : new Date(),
        participants: this.participantList,
        start: this.gameStart,
        end: (new Date()).getTime(),
        rounds: this.roundList.map(round => <any>{
          scores: round.scores.map(score => this.gameService.formatScore(score)  ),
          duration: round.end - round.start
        })
      }

      let gameHistory = this.gameService.readLocalstorage<any[]>('history');

      if (!gameHistory) {
        gameHistory = [];
      }

      gameHistory.unshift(gameSummary);


      gameHistory = gameHistory.slice(0, maxHistory);

      localStorage.setItem('history', JSON.stringify(gameHistory));

    }

    this.participantList = [];
    this.participantSubject.next(this.participantList);
    this.roundList = [];
    this.roundSubject.next(this.roundList);
    localStorage.removeItem('participants');
    localStorage.removeItem('rounds');

  }

  startRound() {
    if (this.activeRound !== null) {
      this.roundList.push({
        start: (new Date()).getTime(),
        end: null,
        scores: this.participantList.map(p => null)
      });
      this.roundSubject.next(this.roundList);
      this.save();
    } else {
      throw new Error("Another round is currently active");
    }
  }


  endRound() {
    const round = this.roundList.find(round => !round.end);
    round.end = (new Date()).getTime();
    this.save();
  }

  closeRound() {
    this.activeRound.closed = (new Date()).getTime();
    this.save();
  }

  get activeRound(): GameRound {
    return  this.roundList.find(round => !round.closed );
  }

  private addParticipants(names: string[]){
    this.participantList = names;
    this.participantSubject.next(this.participantList);
    this.save();
  }

  setScore(playerIndex: number, score: Score) {
    if (this.activeRound) {
      this.activeRound.scores[playerIndex] = score;
      this.save();
    }
  }

  private save() {
    localStorage.setItem('participants', JSON.stringify(this.participantList));
    localStorage.setItem('rounds', JSON.stringify(this.roundList));
  }

  private load() {
    const participants = this.gameService.readLocalstorage<string[]>('participants');
    if (participants) {
        this.participantList = participants;
        this.participantSubject.next(this.participantList);
    }

    const rounds = this.gameService.readLocalstorage<GameRound[]>('rounds');
    if (rounds) {
        this.roundList = rounds;
        this.roundSubject.next(this.roundList);
    }
  }

  get participants(): string[] {
    return this.participantList;
  }

  get participants$(): Observable<string[]> {
    return this.participantSubject.asObservable();
  }

  get rounds(): GameRound[] {
    return this.roundList;
  }

  get rounds$(): Observable<GameRound[]> {
    return this.roundSubject.asObservable();
  }


}

export interface GameRound {
  closed?: number;
  end?: number;
  start: number;
  scores: Score[];
}

export interface Score {
  plus: number;
  minus: number;
}