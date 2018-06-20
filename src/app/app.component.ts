import { Component } from '@angular/core';
import { initializeApp } from 'firebase';

import firebaseConfig from '../firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    initializeApp(firebaseConfig);
  }
}
