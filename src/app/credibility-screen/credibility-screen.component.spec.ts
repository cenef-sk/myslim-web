import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredibilityScreenComponent } from './credibility-screen.component';

describe('CredibilityScreenComponent', () => {
  let component: CredibilityScreenComponent;
  let fixture: ComponentFixture<CredibilityScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredibilityScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredibilityScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
