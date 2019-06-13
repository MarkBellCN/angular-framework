import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyInfoSaveComponent } from './classify-info-save.component';

describe('ClassifyInfoSaveComponent', () => {
  let component: ClassifyInfoSaveComponent;
  let fixture: ComponentFixture<ClassifyInfoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyInfoSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyInfoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
