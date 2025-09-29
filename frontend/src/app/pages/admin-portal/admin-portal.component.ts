import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';
import { Policy } from '../../models/policy';
import { Claim } from '../../models/claim';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomNavbarComponent],
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  policies: Policy[] = [];
  claims: Claim[] = [];

  // form for creating a policy
  newPolicy: Partial<Policy> = {
    code: '',
    title: '',
    description: '',
    premium: 0,
    termMonths: 12,
    minSumInsured: 0,
  };

  constructor(
    private policyService: PolicyService,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
    this.loadClaims();
  }

  // ====== POLICIES ======
  loadPolicies() {
    this.policyService.getAllPolicies().subscribe({
      next: (res) => (this.policies = res),
      error: (err) => console.error('❌ Error fetching policies:', err)
    });
  }

  createPolicy() {
    this.policyService.createPolicy(this.newPolicy).subscribe({
      next: () => {
        alert('✅ Policy created successfully');
        this.newPolicy = { code: '', title: '', description: '', premium: 0, termMonths: 12, minSumInsured: 0 };
        this.loadPolicies();
      },
      error: (err) => alert(err?.error?.message || '❌ Failed to create policy')
    });
  }

  deletePolicy(id: string) {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(id).subscribe({
        next: () => {
          alert('✅ Policy deleted');
          this.loadPolicies();
        },
        error: (err) => alert(err?.error?.message || '❌ Failed to delete policy')
      });
    }
  }

  // ====== CLAIMS ======
  loadClaims() {
    this.insuranceService.getClaims().subscribe({
      next: (res) => (this.claims = res),
      error: (err) => console.error('❌ Error fetching claims:', err)
    });
  }

  updateClaimStatus(claimId: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') {
    this.insuranceService.updateClaimStatus(claimId, { status }).subscribe({
      next: (res) => {
        alert(`✅ Claim ${claimId} updated to ${status}`);
        this.loadClaims(); // refresh
      },
      error: (err) => alert(err?.error?.message || '❌ Failed to update claim')
    });
  }
}
