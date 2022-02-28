import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTrialsComponent } from './display-trials.component';

describe('DisplayTrialsComponent', () => {
  let component: DisplayTrialsComponent;
  let fixture: ComponentFixture<DisplayTrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTrialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
