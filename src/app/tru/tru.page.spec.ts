import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruPage } from './tru.page';

describe('TruPage', () => {
  let component: TruPage;
  let fixture: ComponentFixture<TruPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
