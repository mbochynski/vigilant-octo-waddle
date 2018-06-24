import { Injectable, OnDestroy } from '@angular/core';
import { firestore } from 'firebase';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Injectable()
export class StorageService implements OnDestroy {
  private userSubscription: Subscription;

  constructor(private authService: AuthService) { 
    console.log('create user subscription in storage service');
    
    this.userSubscription = this.authService.userSubject.subscribe(
      (user) => {
        if (user) {
          this.startFetchingData(user.uid);
        } else {
          this.stopFetchingData();
        }
      },
      this.stopFetchingData.bind(this),
      this.stopFetchingData.bind(this)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  startFetchingData(uid: string) {
    console.log('start fetching data', uid);
    
  }

  stopFetchingData() {
    console.log('stop fetching data');

  }
}
