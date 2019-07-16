import { TestBed } from '@angular/core/testing';

import { WcfService } from './wcf.service';

describe('WcfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WcfService = TestBed.get(WcfService);
    expect(service).toBeTruthy();
  });
});
