import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PolicyService } from './policy.service';
import { environment } from '../../environments/environment';

describe('PolicyService', () => {
  let service: PolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PolicyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all policies', () => {
    service.getAllPolicies().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/policies`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should GET user policies', () => {
    service.getUserPolicies().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/user/`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
