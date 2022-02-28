import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiButtonQuestionComponent } from './multi-button-question.component';

describe('MultiButtonQuestionComponent', () => {
  let component: MultiButtonQuestionComponent;
  let fixture: ComponentFixture<MultiButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
