import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulPage } from './ful.page';

describe('FulPage', () => {
  let component: FulPage;
  let fixture: ComponentFixture<FulPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
