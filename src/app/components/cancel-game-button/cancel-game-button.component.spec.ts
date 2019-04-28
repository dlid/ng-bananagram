import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelGameButtonComponent } from './cancel-game-button.component';

describe('CancelGameButtonComponent', () => {
  let component: CancelGameButtonComponent;
  let fixture: ComponentFixture<CancelGameButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelGameButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelGameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
