import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPageComponent } from './claim-page.component';
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

describe('ClaimPageComponent', () => {
  let component: ClaimPageComponent;
  let fixture: ComponentFixture<ClaimPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimPageComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: InsuranceService, useValue: { submitClaim: () => of({}) } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
