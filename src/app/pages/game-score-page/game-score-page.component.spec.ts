import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScorePageComponent } from './game-score-page.component';

describe('GameScorePageComponent', () => {
  let component: GameScorePageComponent;
  let fixture: ComponentFixture<GameScorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
