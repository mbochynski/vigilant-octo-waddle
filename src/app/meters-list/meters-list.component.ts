import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService, MetersSubject } from '../storage.service';
import Meter from '../meter.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meters-list',
  templateUrl: './meters-list.component.html',
  styleUrls: ['./meters-list.component.css']
})
export class MetersListComponent implements OnInit, OnDestroy {
  private meters: Meter[];
  private metersSubscription: Subscription

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.metersSubscription = this.storageService.metersSubject.subscribe(
      ({ meters, /* status */ }) => {
        this.meters = meters;
      }
    );
  }

  ngOnDestroy() {
    this.metersSubscription.unsubscribe();
  }

}
