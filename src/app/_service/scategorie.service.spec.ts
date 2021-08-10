import { TestBed } from '@angular/core/testing';

import { ScategorieService } from './scategorie.service';

describe('ScategorieService', () => {
  let service: ScategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
