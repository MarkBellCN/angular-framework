import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSaveComponent } from './message-save.component';

describe('MessageSaveComponent', () => {
  let component: MessageSaveComponent;
  let fixture: ComponentFixture<MessageSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
