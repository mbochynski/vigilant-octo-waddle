import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import Meter from '../meter.model';

@Component({
  selector: 'app-meters-list',
  templateUrl: './meters-list.component.html',
  styleUrls: ['./meters-list.component.css']
})
export class MetersListComponent implements OnInit {
  private meters: Meter[];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.meters = this.storageService.getMeters();
  }

}
