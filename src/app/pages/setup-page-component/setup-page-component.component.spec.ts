import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPageComponentComponent } from './setup-page-component.component';

describe('SetupPageComponentComponent', () => {
  let component: SetupPageComponentComponent;
  let fixture: ComponentFixture<SetupPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
