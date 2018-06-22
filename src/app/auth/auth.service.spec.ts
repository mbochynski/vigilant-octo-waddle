import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import * as firebase from 'firebase';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });


    const auth = firebase.auth();
    spyOn(auth, 'onAuthStateChanged').and.callFake(function(cb) {
      cb({
        isAnonymous: true,
        uid: '1234',
      });
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should set user to be authorized onAuthStateChanged', inject([AuthService], (service: AuthService) => {
    expect(service.isAuthorized).toBeTruthy();
  }));
  
  it('should set uid on onAuthStateChanged', inject([AuthService], (service: AuthService) => {
    expect(service.uid).toBe('1234');
  }));
  
  it('should set anonymous state to true', inject([AuthService], (service: AuthService) => {
    expect(service.isAnonymous).toBeTruthy();
  }));
});
