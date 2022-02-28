import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrialsComponent } from './admin-trials.component';

describe('AdminTrialsComponent', () => {
  let component: AdminTrialsComponent;
  let fixture: ComponentFixture<AdminTrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
