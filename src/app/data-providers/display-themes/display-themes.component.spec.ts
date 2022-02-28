import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayThemesComponent } from './display-themes.component';

describe('DisplayThemesComponent', () => {
  let component: DisplayThemesComponent;
  let fixture: ComponentFixture<DisplayThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
