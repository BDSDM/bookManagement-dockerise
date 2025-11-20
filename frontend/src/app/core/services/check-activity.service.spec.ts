import { TestBed } from '@angular/core/testing';

import { CheckActivityService } from './check-activity.service';

describe('CheckActivityService', () => {
  let service: CheckActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
