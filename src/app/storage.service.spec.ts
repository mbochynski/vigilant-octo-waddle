import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { StorageService } from './storage.service';
import { AuthService } from './auth/auth.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [StorageService, AuthService]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
