import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dash-board.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';
import { AuthService } from '../../services/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,               // standalone component
        RouterTestingModule.withRoutes([]) // router + routerLink support
      ],
      providers: [
        {
          provide: PolicyService,
          useValue: {
            getAllPolicies: () => of([]),
            getUserPolicies: () => of([])
          }
        },
        {
          provide: InsuranceService,
          useValue: {
            getClaims: () => of([]),
            getRepayments: () => of([])
          }
        },
        {
          provide: AuthService,
          useValue: { user$: of({ role: 'customer' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // get router from RouterTestingModule
    router = TestBed.inject(Router);
    routerNavigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect for non-admin users', () => {
    expect(routerNavigateSpy).not.toHaveBeenCalledWith(['/admin']);
  });

  // 👉 Example: test redirect for admin users
  it('should redirect admin users to /admin', () => {
    // swap AuthService with role = admin
    const authService = TestBed.inject(AuthService) as any;
    authService.user$ = of({ role: 'admin' });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(routerNavigateSpy).toHaveBeenCalledWith(['/admin']);
  });
});
