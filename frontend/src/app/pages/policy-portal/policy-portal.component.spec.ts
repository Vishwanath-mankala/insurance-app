import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPortalComponent } from './policy-portal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PolicyService } from '../../services/policy.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('PolicyPortalComponent', () => {
  let component: PolicyPortalComponent;
  let fixture: ComponentFixture<PolicyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPortalComponent, RouterTestingModule],
      providers: [
        { provide: PolicyService, useValue: { getAllPolicies: () => of([]) } },
        { provide: AuthService, useValue: { user$: of({ role: 'customer' }) } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
