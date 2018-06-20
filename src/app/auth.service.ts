import { Injectable } from '@angular/core';
import { auth, initializeApp } from 'firebase';

import firebaseConfig from '../firebase.config';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authorized = false;
  isAnonymous = false;
  uid: string;

  constructor(router: Router) { 
    try {
      initializeApp(firebaseConfig);
    } catch (e) {
      console.error(e);
    }

    auth().onAuthStateChanged(function(user) {
      if (user) {
        this.authorized = true;
        this.isAnonymous = user.isAnonymous;
        this.uid = user.uid;
        console.log('User is logged in', this.uid);
        router.navigate(['/']);
      } else {
        this.authorized = false;
        this.isAnonymous = false;
        this.uid = null;
        console.log('User is logged out');
        router.navigate(['/login']);
      }
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
