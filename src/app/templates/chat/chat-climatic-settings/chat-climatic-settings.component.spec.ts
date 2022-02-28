import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatClimaticSettingsComponent } from './chat-climatic-settings.component';

describe('ChatClimaticSettingsComponent', () => {
  let component: ChatClimaticSettingsComponent;
  let fixture: ComponentFixture<ChatClimaticSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatClimaticSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatClimaticSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
