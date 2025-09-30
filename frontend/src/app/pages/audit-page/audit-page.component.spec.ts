import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditPageComponent } from './audit-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

class ActivatedRouteStub {
  url = of([{ path: 'audit' }] as any);
}

describe('AuditPageComponent', () => {
  let component: AuditPageComponent;
  let fixture: ComponentFixture<AuditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AdminService,
          useValue: {
            getAuditLogs: () => of([]),
            getSummary: () => of({})
          }
        },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        // 👇 JWT + HttpClient providers
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
