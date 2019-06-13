import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardrecordListComponent } from './boardrecord-list.component';

describe('BoardrecordListComponent', () => {
  let component: BoardrecordListComponent;
  let fixture: ComponentFixture<BoardrecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardrecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardrecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
