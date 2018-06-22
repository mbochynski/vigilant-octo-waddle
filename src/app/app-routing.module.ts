import { RouterModule, Routes } from '@angular/router';

import { MetersListComponent } from './meters-list/meters-list.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'meters', component: MetersListComponent, canActivate: [AuthGuard] },
  { path: 'meter/:id', component: MeterDetailsComponent, canActivate: [AuthGuard] },
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