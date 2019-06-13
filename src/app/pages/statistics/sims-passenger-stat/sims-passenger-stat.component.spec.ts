import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimsPassengerStatComponent } from './sims-passenger-stat.component';

describe('SimsPassengerStatComponent', () => {
  let component: SimsPassengerStatComponent;
  let fixture: ComponentFixture<SimsPassengerStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimsPassengerStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimsPassengerStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
