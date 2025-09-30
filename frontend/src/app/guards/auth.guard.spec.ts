import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let routerNavigateSpy: jasmine.Spy;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { checkLogin: () => false } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });
    routerNavigateSpy = TestBed.inject(Router).navigate as jasmine.Spy;
  });

  it('should deny access and redirect when not logged in', () => {
    const can = executeGuard({} as any, {} as any);
    expect(can).toBeFalse();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access when logged in', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { checkLogin: () => true } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });
    const allowed = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(allowed).toBeTrue();
  });
});
