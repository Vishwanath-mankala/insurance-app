import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { authRoleGuard } from './auth-role.guard';
import { AuthService } from '../services/auth.service';

describe('authRoleGuard', () => {
  let routerNavigateSpy: jasmine.Spy;

  const execute = (data: any = { roles: ['admin'] }) =>
    TestBed.runInInjectionContext(() => authRoleGuard({ data } as any, {} as any));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { user$: of({ role: 'customer' }) } },
      ],
    });
    routerNavigateSpy = TestBed.inject(Router).navigate as jasmine.Spy;
  });

  it('should deny and redirect when role not allowed', (done) => {
    const obs = execute() as unknown as Observable<boolean | UrlTree>;
    obs.subscribe((result: boolean | UrlTree) => {
      expect(result).toBeFalse();
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should allow when role is allowed', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { user$: of({ role: 'admin' }) } },
      ],
    });

    const result$ = TestBed.runInInjectionContext(() => authRoleGuard({ data: { roles: ['admin'] } } as any, {} as any)) as unknown as Observable<boolean | UrlTree>;
    result$.subscribe((result: boolean | UrlTree) => {
      expect(result).toBeTrue();
      done();
    });
  });
});
