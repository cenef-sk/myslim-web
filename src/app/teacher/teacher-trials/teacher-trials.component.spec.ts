import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTrialsComponent } from './teacher-trials.component';

describe('TeacherTrialsComponent', () => {
  let component: TeacherTrialsComponent;
  let fixture: ComponentFixture<TeacherTrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherTrialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
