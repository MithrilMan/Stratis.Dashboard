import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandUsageComponent } from './band-usage.component';

describe('BandUsageComponent', () => {
  let component: BandUsageComponent;
  let fixture: ComponentFixture<BandUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
