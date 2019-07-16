import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBackFlashPage } from './play-back-flash.page';

describe('PlayBackFlashPage', () => {
  let component: PlayBackFlashPage;
  let fixture: ComponentFixture<PlayBackFlashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayBackFlashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBackFlashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
