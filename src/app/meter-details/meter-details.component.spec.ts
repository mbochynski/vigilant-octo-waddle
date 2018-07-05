import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MeterDetailsComponent } from './meter-details.component';
import { StorageService } from '../storage.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

describe('MeterDetailsComponent', () => {
  let component: MeterDetailsComponent;
  let fixture: ComponentFixture<MeterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        StorageService,
        {
          provide: ActivatedRoute, 
          useValue: {snapshot: {params: {'id': '123'}}},
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
