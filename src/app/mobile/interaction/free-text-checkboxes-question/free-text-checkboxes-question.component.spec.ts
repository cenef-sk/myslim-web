import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTextCheckboxesQuestionComponent } from './free-text-checkboxes-question.component';

describe('FreeTextCheckboxesQuestionComponent', () => {
  let component: FreeTextCheckboxesQuestionComponent;
  let fixture: ComponentFixture<FreeTextCheckboxesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTextCheckboxesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTextCheckboxesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
