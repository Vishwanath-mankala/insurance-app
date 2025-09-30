import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentPageComponent } from './repayment-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InsuranceService } from '../../services/insurance.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

class ActivatedRouteStub {
  snapshot = { paramMap: new Map([['id', 'up1']]) } as any;
}

describe('RepaymentPageComponent', () => {
  let component: RepaymentPageComponent;
  let fixture: ComponentFixture<RepaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepaymentPageComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: InsuranceService, useValue: { recordPayment: () => of({}) } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
