import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmExitComponent } from './dialog-confirm-exit.component';

describe('DialogConfirmExitComponent', () => {
  let component: DialogConfirmExitComponent;
  let fixture: ComponentFixture<DialogConfirmExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
