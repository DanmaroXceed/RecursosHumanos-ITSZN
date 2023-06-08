import { TestBed } from '@angular/core/testing';

import { StudiesProgramService } from './studies-program.service';

describe('StudiesProgramService', () => {
  let service: StudiesProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudiesProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
