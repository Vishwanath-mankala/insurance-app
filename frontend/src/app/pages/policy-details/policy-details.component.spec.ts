import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailsComponent } from './policy-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PolicyService } from '../../services/policy.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

class ActivatedRouteStub {
  snapshot = { paramMap: new Map([['id', 'up1']]) } as any;
}

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyDetailsComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PolicyService, useValue: { getUserPolicies: () => of([]), getPolicyDetails: () => of({}) } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
