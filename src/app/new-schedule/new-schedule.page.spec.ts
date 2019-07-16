import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSchedulePage } from './new-schedule.page';

describe('NewSchedulePage', () => {
  let component: NewSchedulePage;
  let fixture: ComponentFixture<NewSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
