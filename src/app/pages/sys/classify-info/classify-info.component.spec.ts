import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyInfoComponent } from './classify-info.component';

describe('ClassifyInfoComponent', () => {
  let component: ClassifyInfoComponent;
  let fixture: ComponentFixture<ClassifyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
