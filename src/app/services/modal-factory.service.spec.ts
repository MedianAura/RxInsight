import { TestBed, inject } from '@angular/core/testing';

import { ModalFactoryService } from './modal-factory.service';

describe('ModalFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalFactoryService]
    });
  });

  it('should be created', inject([ModalFactoryService], (service: ModalFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
