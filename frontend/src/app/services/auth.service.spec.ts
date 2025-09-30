import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let jwt: JwtHelperService;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwt = TestBed.inject(JwtHelperService);
    routerNavigateSpy = TestBed.inject(Router).navigate as jasmine.Spy;

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkLogin should return false when no token', () => {
    spyOn(jwt, 'isTokenExpired').and.returnValue(true);
    expect(service.checkLogin()).toBeFalse();
  });

  it('checkLogin should clear expired token and return false', () => {
    localStorage.setItem('token', 't');
    spyOn(jwt, 'isTokenExpired').and.returnValue(true);
    expect(service.checkLogin()).toBeFalse();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('login should store token and emit user', () => {
    const email = 'a@b.com';
    const password = 'x';
    const mockResponse = { token: 'jwt', user: { _id: '1', name: 'A', email, role: 'customer' } };

    let emittedUser: any;
    const sub = service.user$.subscribe(u => emittedUser = u);

    service.login(email, password).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toBe('jwt');
    expect(emittedUser).toEqual(mockResponse.user);

    sub.unsubscribe();
  });

  it('logout should clear token and navigate to login', () => {
    localStorage.setItem('token', 'x');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
