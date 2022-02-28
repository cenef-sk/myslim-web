import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayParticipantsComponent } from './display-participants.component';

describe('DisplayParticipantsComponent', () => {
  let component: DisplayParticipantsComponent;
  let fixture: ComponentFixture<DisplayParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
