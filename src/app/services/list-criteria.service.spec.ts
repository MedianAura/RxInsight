import { TestBed, inject } from '@angular/core/testing';

import { ListCriteriaService } from './list-criteria.service';

describe('ListCriteriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListCriteriaService]
    });
  });

  it('should be created', inject([ListCriteriaService], (service: ListCriteriaService) => {
    expect(service).toBeTruthy();
  }));
});
