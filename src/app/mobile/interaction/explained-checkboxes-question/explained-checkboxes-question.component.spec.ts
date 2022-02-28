import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainedCheckboxesQuestionComponent } from './explained-checkboxes-question.component';

describe('ExplainedCheckboxesQuestionComponent', () => {
  let component: ExplainedCheckboxesQuestionComponent;
  let fixture: ComponentFixture<ExplainedCheckboxesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainedCheckboxesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainedCheckboxesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
