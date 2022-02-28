import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTeamComponent } from './statistics-team.component';

describe('StatisticsTeamComponent', () => {
  let component: StatisticsTeamComponent;
  let fixture: ComponentFixture<StatisticsTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
