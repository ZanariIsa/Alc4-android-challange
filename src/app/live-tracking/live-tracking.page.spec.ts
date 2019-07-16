import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackingPage } from './live-tracking.page';

describe('LiveTrackingPage', () => {
  let component: LiveTrackingPage;
  let fixture: ComponentFixture<LiveTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrackingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
