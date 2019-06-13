import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysResourceSaveComponent } from './sys-resource-save.component';

describe('SysResourceSaveComponent', () => {
  let component: SysResourceSaveComponent;
  let fixture: ComponentFixture<SysResourceSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysResourceSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysResourceSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
