import { Injectable, OnDestroy } from '@angular/core';
import { firestore } from 'firebase';
import { AuthService } from './auth/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import Meter from './meter.model';

const COLLECTION = 'meters';

enum Status {
  INIT,
  FETCHING,
  READY,
}

export interface MetersSubject {
  status: Status,
  meters: Meter[],
}

@Injectable()
export class StorageService implements OnDestroy {
  private db: firestore.Firestore;

  private userSubscription: Subscription;
  private firebaseUnsubscribe: Function;
  private status = Status.INIT;
  private docRef: firestore.DocumentReference;

  private meters: Meter[] = [];

  public metersSubject: BehaviorSubject<MetersSubject> = new BehaviorSubject({ status: this.status, meters: []});

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
    this.docRef = this.db.collection(COLLECTION).doc(uid);
    this.firebaseUnsubscribe = this.docRef.onSnapshot((doc) => {
      this.status = Status.READY;
      const data = doc.data();

      if (data) {
        this.meters = <Meter[]>data.list;
      } else {
        this.meters = [];
      }
      this.metersSubject.next({
        status: this.status,
        meters: this.meters,
      });
    }); 
  }

  private stopFetchingData() {
    console.log('stop fetching data');
    this.firebaseUnsubscribe();
    this.meters = [];
    this.status = Status.INIT;
    this.docRef = null;
    this.metersSubject.next({
      status: this.status,
      meters: this.meters,
    });
  }

  public addNewMeter(name) {
    this.meters.push({
      name: 'newly created meter',
      entries: [],
    });   

    this.docRef.set({
      list: this.meters,
    }).then(() => {
      console.log('Saving document succedded');
    })
    .catch((error) => {
      console.log('Saving document failed', error);
    });
  }
}
