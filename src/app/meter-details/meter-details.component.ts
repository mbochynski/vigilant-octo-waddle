import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import Meter from '../meter.model';
import { StorageService } from '../storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meter-details',
  templateUrl: './meter-details.component.html',
  styleUrls: ['./meter-details.component.css']
})
export class MeterDetailsComponent implements OnInit {
  private meterId: number;
  private meter: Meter = { name: '', entries: [] };
  private metersSubscription: Subscription

  private addingNewEntry = false;
  private newEntryFormGroup: FormGroup;
  private invalidFormMessage = '';

  constructor(private activatedRoute: ActivatedRoute,
              private storageService: StorageService) { }

  ngOnInit() {
    this.meterId = +this.activatedRoute.snapshot.params['id'];

    this.metersSubscription = this.storageService.metersSubject.subscribe(
      ({ meters, /* status */ }) => {
        if (this.meterId != null) {
          this.meter = meters[this.meterId];
        }
      }
    );

    const nowDateString = new Date().toISOString().split('T')[0];
    
    this.newEntryFormGroup = new FormGroup({
      value: new FormControl(null, [Validators.required]),
      date: new FormControl(nowDateString, [Validators.required]),
    });
  }

  handleSubmit() {
    if (this.newEntryFormGroup.invalid) {
      this.invalidFormMessage = 'Podaj nowy odczyt i jego datę';
    } else {
      this.invalidFormMessage = '';
      const {
        value,
        date,
      } = this.newEntryFormGroup.value;
      this.storageService.addMeterEntry(this.meterId, value, new Date(date));
    }
  }

}
