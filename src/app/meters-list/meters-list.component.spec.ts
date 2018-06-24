import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetersListComponent } from './meters-list.component';
import { StorageService } from '../storage.service';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MetersListComponent', () => {
  let component: MetersListComponent;
  let fixture: ComponentFixture<MetersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MetersListComponent ],
      providers: [AuthService, StorageService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
