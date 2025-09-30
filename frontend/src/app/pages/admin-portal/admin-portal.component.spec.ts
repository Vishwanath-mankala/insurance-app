import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPortalComponent } from './admin-portal.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';
import { of } from 'rxjs';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPortalComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: PolicyService,
          useValue: {
            getAllPolicies: () => of([]),
            createPolicy: () => of({}),
            deletePolicy: () => of({})
          }
        },
        {
          provide: InsuranceService,
          useValue: {
            getClaims: () => of([]),
            updateClaimStatus: () => of({})
          }
        },
        // 👇 JwtHelperService needs JWT_OPTIONS
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
