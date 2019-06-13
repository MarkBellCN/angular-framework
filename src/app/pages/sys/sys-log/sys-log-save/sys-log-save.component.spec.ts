import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysLogSaveComponent } from './sys-log-save.component';

describe('SysLogSaveComponent', () => {
  let component: SysLogSaveComponent;
  let fixture: ComponentFixture<SysLogSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysLogSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysLogSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
