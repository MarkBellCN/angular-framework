import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRoleSaveComponent } from './sys-role-save.component';

describe('SysRoleSaveComponent', () => {
  let component: SysRoleSaveComponent;
  let fixture: ComponentFixture<SysRoleSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysRoleSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRoleSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
