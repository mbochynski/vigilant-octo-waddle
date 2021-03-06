import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetersListComponent } from './meters-list/meters-list.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { StorageService } from './storage.service';


@NgModule({
  declarations: [
    AppComponent,
    MetersListComponent,
    MeterDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
