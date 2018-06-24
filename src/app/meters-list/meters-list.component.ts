import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-meters-list',
  templateUrl: './meters-list.component.html',
  styleUrls: ['./meters-list.component.css']
})
export class MetersListComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

}
