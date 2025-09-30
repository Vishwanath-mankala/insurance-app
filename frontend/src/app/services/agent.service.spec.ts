import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AgentService } from './agent.service';
import { environment } from '../../environments/environment';

describe('AgentService', () => {
  let service: AgentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AgentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET agents', () => {
    service.getAgents().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/agents/`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should POST create agent', () => {
    service.createAgent('n', 'e', 'p').subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/agents/`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should PUT assign agent', () => {
    service.assignAgent('a1', 'u1').subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/agents/a1/assign`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
});
