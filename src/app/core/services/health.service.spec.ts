import { TestBed } from '@angular/core/testing';

import { HealthService } from './health.service';

describe('TestService', () => {
  let service: HealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    service.getHealth().subscribe((data) => {
      expect(data).toBe({
        status: 'Healthy!'
      });
    });
  });
});
