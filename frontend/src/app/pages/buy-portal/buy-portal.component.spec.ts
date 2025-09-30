import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPortalComponent } from './buy-portal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PolicyService } from '../../services/policy.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

class ActivatedRouteStub {
  snapshot = { paramMap: new Map([['id', 'p1']]) } as any;
}

describe('BuyPortalComponent', () => {
  let component: BuyPortalComponent;
  let fixture: ComponentFixture<BuyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPortalComponent, RouterTestingModule],
      providers: [
        { provide: PolicyService, useValue: { purchasePolicy: () => of({}) } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: AuthService, useValue: { user$: of({ role: 'customer' }) } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
