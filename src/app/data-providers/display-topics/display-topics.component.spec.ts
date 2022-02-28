import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTopicsComponent } from './display-topics.component';

describe('DisplayTopicsComponent', () => {
  let component: DisplayTopicsComponent;
  let fixture: ComponentFixture<DisplayTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
