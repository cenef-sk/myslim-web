import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTopicsComponent } from './teacher-topics.component';

describe('TeacherTopicsComponent', () => {
  let component: TeacherTopicsComponent;
  let fixture: ComponentFixture<TeacherTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
