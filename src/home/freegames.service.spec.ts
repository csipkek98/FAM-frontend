import { TestBed } from '@angular/core/testing';

import { FreegameService } from './freegames.service';

describe('FreegameServiceService', () => {
  let service: FreegameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreegameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
