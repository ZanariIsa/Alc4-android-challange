import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelperPage } from './fuelper.page';

describe('FuelperPage', () => {
  let component: FuelperPage;
  let fixture: ComponentFixture<FuelperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelperPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
