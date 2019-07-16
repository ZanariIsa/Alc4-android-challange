import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileagesPage } from './mileages.page';

describe('MileagesPage', () => {
  let component: MileagesPage;
  let fixture: ComponentFixture<MileagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
