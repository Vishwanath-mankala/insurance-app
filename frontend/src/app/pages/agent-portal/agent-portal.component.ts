import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'app-agent-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-portal.component.html',
  styleUrls: ['./agent-portal.component.css']
})
export class AgentPortalComponent implements OnInit {
  agents: any[] = [];
  userPolicies: any[] = [];

  // form for creating an agent
  newAgent = { name: '', email: '', password: '' };

  // for assignment
  selectedAgentId: string = '';
  selectedUserPolicyId: string = '';

  constructor(
    private agentService: AgentService,
    private policyService: PolicyService,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadUserPolicies();
  }

  loadAgents() {
    this.agentService.getAgents().subscribe({
      next: (res: any) => (this.agents = res),
      error: (err) => console.error('❌ Error loading agents:', err)
    });
  }

  loadUserPolicies() {
    this.policyService.getUserPolicies().subscribe({
      next: (res: any) => (this.userPolicies = res),
      error: (err) => console.error('❌ Error loading user policies:', err)
    });
  }

  createAgent() {
    this.agentService.createAgent(
      this.newAgent.name,
      this.newAgent.email,
      this.newAgent.password
    ).subscribe({
      next: () => {
        alert('✅ Agent created successfully');
        this.newAgent = { name: '', email: '', password: '' };
        this.loadAgents();
      },
      error: (err) => alert(err?.error?.message || '❌ Failed to create agent')
    });
  }

  assignAgent() {
    if (!this.selectedAgentId || !this.selectedUserPolicyId) {
      alert('Please select an agent and a policy');
      return;
    }

    this.agentService.assignAgent(this.selectedAgentId, this.selectedUserPolicyId)
      .subscribe({
        next: () => {
          alert('✅ Agent assigned successfully');
          this.selectedAgentId = '';
          this.selectedUserPolicyId = '';
        },
        error: (err) => alert(err?.error?.message || '❌ Failed to assign agent')
      });
  }
}
