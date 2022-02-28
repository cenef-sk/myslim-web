import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableCheckboxesQuestionComponent } from './expandable-checkboxes-question.component';

describe('ExpandableCheckboxesQuestionComponent', () => {
  let component: ExpandableCheckboxesQuestionComponent;
  let fixture: ComponentFixture<ExpandableCheckboxesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableCheckboxesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableCheckboxesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
