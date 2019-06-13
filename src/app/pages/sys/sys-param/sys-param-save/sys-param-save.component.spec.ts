import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysParamSaveComponent } from './sys-param-save.component';

describe('SysParamSaveComponent', () => {
  let component: SysParamSaveComponent;
  let fixture: ComponentFixture<SysParamSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysParamSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysParamSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
