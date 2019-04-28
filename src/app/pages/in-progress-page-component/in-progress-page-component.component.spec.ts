import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressPageComponentComponent } from './in-progress-page-component.component';

describe('InProgressPageComponentComponent', () => {
  let component: InProgressPageComponentComponent;
  let fixture: ComponentFixture<InProgressPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
