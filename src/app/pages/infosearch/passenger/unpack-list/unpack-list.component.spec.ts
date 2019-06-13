import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpackListComponent } from './unpack-list.component';

describe('UnpackListComponent', () => {
  let component: UnpackListComponent;
  let fixture: ComponentFixture<UnpackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
