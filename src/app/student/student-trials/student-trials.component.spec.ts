import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrialsComponent } from './student-trials.component';

describe('StudentTrialsComponent', () => {
  let component: StudentTrialsComponent;
  let fixture: ComponentFixture<StudentTrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTrialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
