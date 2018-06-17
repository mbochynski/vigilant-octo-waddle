import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MetersListComponent } from './meters-list/meters-list.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';

const routes: Routes = [
  { path: 'meters', component: MetersListComponent },
  { path: 'meter/:id', component: MeterDetailsComponent },
  { path: '', redirectTo: '/meters', pathMatch: 'full' },
  { path: '**', redirectTo: '/meters' },
];

@NgModule({
  declarations: [
    AppComponent,
    MetersListComponent,
    MeterDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
