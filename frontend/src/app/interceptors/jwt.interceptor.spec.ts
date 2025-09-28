import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { jwtInterceptor } from './jwt.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('jwtInterceptor (functional)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let jwtHelper: JwtHelperService;

  // Any string is fine; we stub isTokenExpired so it won't be decoded.
  const testToken = 'abc.def.ghi';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Functional HttpClient + interceptor
        provideHttpClient(withInterceptors([jwtInterceptor])),
        // Testing utilities for HttpClient
        provideHttpClientTesting(),
        // Required for JwtHelperService construction
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelper = TestBed.inject(JwtHelperService);

    // Default: token is valid (boolean return, NOT a Promise)
    spyOn(jwtHelper, 'isTokenExpired').and.returnValue(false);

    // Put a token in storage for tests that expect it
    localStorage.setItem('token', testToken);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header when token is present and valid', () => {
    http.get('/api/data').subscribe();

    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    req.flush({});
  });

  it('should NOT add Authorization header if token is expired', () => {
    (jwtHelper.isTokenExpired as jasmine.Spy).and.returnValue(true);

    http.get('/api/data').subscribe();

    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should NOT add Authorization header for excluded URL', () => {
    http.get('/api/v1/auth/login').subscribe();

    const req = httpMock.expectOne('/api/v1/auth/login');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should NOT add Authorization header if no token exists', () => {
    localStorage.removeItem('token');

    http.get('/api/data').subscribe();

    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
