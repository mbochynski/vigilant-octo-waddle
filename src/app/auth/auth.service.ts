import { Injectable } from '@angular/core';
import { auth, initializeApp, User } from 'firebase';

import firebaseConfig from '../../firebase.config';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  isAuthorized = false;
  isAnonymous = false;
  uid: string;

  userSubject = new BehaviorSubject<User>(null);

  constructor(router: Router) { 
    try {
      initializeApp(firebaseConfig);
    } catch (e) {
      console.error(e);
    }

    auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuthorized = true;
        this.isAnonymous = user.isAnonymous;
        this.uid = user.uid;
        console.log('User is logged in', this.uid);
        router.navigate(['/']);
      } else {
        this.isAuthorized = false;
        this.isAnonymous = false;
        this.uid = null;
        console.log('User is logged out');
        router.navigate(['/login']);
      }
      this.userSubject.next(user);
    });
  }

  signInAnonymously() {
    auth().signInAnonymously().catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error('SignIn error', errorCode, errorMessage);
    });
  }
}
