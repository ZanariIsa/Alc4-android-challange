import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePerformancePage } from './vehicle-performance.page';

describe('VehiclePerformancePage', () => {
  let component: VehiclePerformancePage;
  let fixture: ComponentFixture<VehiclePerformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePerformancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePerformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
