import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactStatisticsComponent } from './compact-statistics.component';

describe('CompactStatisticsComponent', () => {
  let component: CompactStatisticsComponent;
  let fixture: ComponentFixture<CompactStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompactStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
