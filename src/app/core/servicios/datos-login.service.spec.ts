import { TestBed } from '@angular/core/testing';

import { DatosLoginService } from './datos-login.service';

describe('DatosLoginService', () => {
  let service: DatosLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
