import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

describe('errorInterceptor (functional)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let notifier: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    notifier = jasmine.createSpyObj('NotificationService', ['info', 'warn', 'error']);
    router = jasmine.createSpyObj('Router', ['navigate'], { url: '/current' });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notifier },
        { provide: Router, useValue: router },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should handle 400 with warn', () => {
    http.get('/t').subscribe({ error: () => {} });
    const req = httpMock.expectOne('/t');
    req.flush({ message: 'bad' }, { status: 400, statusText: 'Bad Request' });
    expect(notifier.warn).toHaveBeenCalled();
  });

  it('should handle 401: clear token, notify and navigate to login', () => {
    localStorage.setItem('token', 'x');
    http.get('/t').subscribe({ error: () => {} });
    const req = httpMock.expectOne('/t');
    req.flush('unauth', { status: 401, statusText: 'Unauthorized' });
    expect(localStorage.getItem('token')).toBeNull();
    expect(notifier.info).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: router.url } });
  });

  it('should handle network error (status 0) with error notification', () => {
    http.get('/t').subscribe({ error: () => {} });
    const req = httpMock.expectOne('/t');
    req.flush('offline', { status: 0, statusText: 'Unknown Error' });
    expect(notifier.error).toHaveBeenCalled();
  });
});
