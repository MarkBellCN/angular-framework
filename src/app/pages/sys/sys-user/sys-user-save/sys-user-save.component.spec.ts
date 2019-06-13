import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserSaveComponent } from './sys-user-save.component';

describe('SysUserSaveComponent', () => {
  let component: SysUserSaveComponent;
  let fixture: ComponentFixture<SysUserSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysUserSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysUserSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
