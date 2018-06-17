import { RouterModule, Routes } from '@angular/router';

import { MetersListComponent } from './meters-list/meters-list.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'meters', component: MetersListComponent },
  { path: 'meter/:id', component: MeterDetailsComponent },
  { path: '', redirectTo: '/meters', pathMatch: 'full' },
  { path: '**', redirectTo: '/meters' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}