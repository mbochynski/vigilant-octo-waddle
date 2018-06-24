import { Injectable, OnDestroy } from '@angular/core';
import { firestore } from 'firebase';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import Meter from './meter.model';

const COLLECTION = 'meters';

enum Status {
  INIT,
  FETCHING,
  READY,
}

@Injectable()
export class StorageService implements OnDestroy {
  private db: firestore.Firestore;

  private userSubscription: Subscription;
  private firebaseUnsubscribe: Function;
  private status = Status.INIT;

  private meters: Meter[] = [];

  constructor(private authService: AuthService) { 
    console.log('create user subscription in storage service');

    this.db = firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
    
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

  private startFetchingData(uid: string) {
    this.status = Status.FETCHING;
    console.log('start fetching data', uid);
    this.firebaseUnsubscribe = firestore().collection(COLLECTION).doc(uid).onSnapshot((doc) => {
      this.status = Status.READY;
      const data = doc.data();

      if (data) {
        this.meters = data.list.map(meter => {
          return new Meter(meter.name, meter.entries);
        });
      } else {
        this.meters = [];
      }
    }); 
  }

  private stopFetchingData() {
    console.log('stop fetching data');
    this.firebaseUnsubscribe();
  }

  getMeters() {
    return this.meters;
  }
}
