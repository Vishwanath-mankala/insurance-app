import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { InsuranceService } from './insurance.service';
import { environment } from '../../environments/environment';

describe('InsuranceService', () => {
  let service: InsuranceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(InsuranceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET claims', () => {
    service.getClaims().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/claims`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should GET repayments', () => {
    service.getRepayments().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/payments/user`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
