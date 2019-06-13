import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegluggageListComponent } from './regluggage-list.component';

describe('RegluggageListComponent', () => {
  let component: RegluggageListComponent;
  let fixture: ComponentFixture<RegluggageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegluggageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegluggageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
