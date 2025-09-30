import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { retryInterceptor } from './retry.interceptor';

describe('retryInterceptor (functional)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retry transient errors up to maxTries', fakeAsync(() => {
    http.get('retry-test').subscribe({
      next: () => fail('should not succeed'),
      error: () => {}
    });

    // flush first request
    const req1 = httpMock.expectOne('retry-test');
    req1.flush('offline', { status: 0, statusText: 'Offline' });

    // flush retries
    const req2 = httpMock.expectOne('retry-test');
    req2.flush('offline', { status: 0, statusText: 'Offline' });

    const req3 = httpMock.expectOne('retry-test');
    req3.flush('offline', { status: 0, statusText: 'Offline' });

    const req4 = httpMock.expectOne('retry-test');
    req4.flush('offline', { status: 0, statusText: 'Offline' });

    // advance timers so retry logic completes
    tick(1000 * 3);
  }));
});
