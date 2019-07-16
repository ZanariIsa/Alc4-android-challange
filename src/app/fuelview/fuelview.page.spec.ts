import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelviewPage } from './fuelview.page';

describe('FuelviewPage', () => {
  let component: FuelviewPage;
  let fixture: ComponentFixture<FuelviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
