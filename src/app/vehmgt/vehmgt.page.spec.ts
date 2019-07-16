import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehmgtPage } from './vehmgt.page';

describe('VehmgtPage', () => {
  let component: VehmgtPage;
  let fixture: ComponentFixture<VehmgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehmgtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehmgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
