import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgentService } from '../../services/agent.service';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';

import { User } from '../../models/user';
import { Policy } from '../../models/policy';
import { UserPolicyAdmin } from '../../models/user-policy-admin';

@Component({
  selector: 'app-agent-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-portal.component.html',
  styleUrls: ['./agent-portal.component.css']
})
export class AgentPortalComponent implements OnInit {
  agents: User[] = [];
  userPolicies: UserPolicyAdmin[] = [];
  policies: Policy[] = [];

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
    this.loadPolicies(); // ✅ preload policies once
  }

  // ====== LOADERS ======
  loadAgents() {
    this.agentService.getAgents().subscribe({
      next: (res: any) => (this.agents = res),
      error: (err) => console.error('❌ Error loading agents:', err)
    });
  }

  loadUserPolicies() {
    this.policyService.getUserPolicies().subscribe({
      next: (res: any) => {
        this.userPolicies = res;
        console.log('UserPolicies:', this.userPolicies);
      },
      error: (err) => console.error('❌ Error loading user policies:', err)
    });
  }

  loadPolicies() {
    this.policyService.getAllPolicies().subscribe({
      next: (res: Policy[]) => (this.policies = res),
      error: (err) => console.error('❌ Error loading policies:', err)
    });
  }

  // ====== HELPERS ======
  findTitle(policyProductId: string): string {
    const policy = this.policies.find((p) => p._id === policyProductId);
    return policy ? policy.title : 'Unknown Policy';
  }

  // ====== ACTIONS ======
  createAgent() {
    this.agentService
      .createAgent(this.newAgent.name, this.newAgent.email, this.newAgent.password)
      .subscribe({
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

    this.agentService.assignAgent(this.selectedAgentId, this.selectedUserPolicyId).subscribe({
      next: () => {
        alert('✅ Agent assigned successfully');
        this.selectedAgentId = '';
        this.selectedUserPolicyId = '';
      },
      error: (err) => alert(err?.error?.message || '❌ Failed to assign agent')
    });
  }
}
