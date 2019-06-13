import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyrecordListComponent } from './verifyrecord-list.component';

describe('VerifyrecordListComponent', () => {
  let component: VerifyrecordListComponent;
  let fixture: ComponentFixture<VerifyrecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyrecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyrecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
