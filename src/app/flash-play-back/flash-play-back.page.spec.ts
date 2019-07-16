import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashPlayBackPage } from './flash-play-back.page';

describe('FlashPlayBackPage', () => {
  let component: FlashPlayBackPage;
  let fixture: ComponentFixture<FlashPlayBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashPlayBackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashPlayBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
