import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPortalComponent } from './agent-portal.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AgentService } from '../../services/agent.service';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';
import { of } from 'rxjs';

describe('AgentPortalComponent', () => {
  let component: AgentPortalComponent;
  let fixture: ComponentFixture<AgentPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPortalComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AgentService, useValue: { getAgents: () => of([]), createAgent: () => of({}), assignAgent: () => of({}) } },
        { provide: PolicyService, useValue: { getAllPolicies: () => of([]), getUserPolicies: () => of([]) } },
        { provide: InsuranceService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
