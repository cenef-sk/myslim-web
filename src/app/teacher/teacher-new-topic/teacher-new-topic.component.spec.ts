import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNewTopicComponent } from './teacher-new-topic.component';

describe('TeacherNewTopicComponent', () => {
  let component: TeacherNewTopicComponent;
  let fixture: ComponentFixture<TeacherNewTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNewTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNewTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
