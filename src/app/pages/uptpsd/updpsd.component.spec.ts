import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdpsdComponent } from './updpsd.component';

describe('UpdpsdComponent', () => {
  let component: UpdpsdComponent;
  let fixture: ComponentFixture<UpdpsdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdpsdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdpsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
