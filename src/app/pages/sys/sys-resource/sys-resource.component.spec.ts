import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysResourceComponent } from './sys-resource.component';

describe('SysResourceComponent', () => {
  let component: SysResourceComponent;
  let fixture: ComponentFixture<SysResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
