import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSaveComponent } from './department-save.component';

describe('DepartmentSaveComponent', () => {
  let component: DepartmentSaveComponent;
  let fixture: ComponentFixture<DepartmentSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
