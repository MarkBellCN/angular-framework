import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouppassengerDetailsComponent } from './grouppassenger-details.component';

describe('GrouppassengerDetailsComponent', () => {
  let component: GrouppassengerDetailsComponent;
  let fixture: ComponentFixture<GrouppassengerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouppassengerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouppassengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
