import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy';
import { UserPolicy } from '../../models/user-policy';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';

@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [CommonModule,CustomNavbarComponent],
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {
  userPolicyId!: string;
  userPolicy: UserPolicy | null = null;
  policy: Policy | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.userPolicyId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.userPolicyId) {
      this.error = 'Invalid User Policy ID';
      this.loading = false;
      return;
    }
    
    // Step 1: fetch all user policies
    this.policyService.getUserPolicies().subscribe({
      next: (userPolicies: UserPolicy[]) => {
        this.userPolicy = userPolicies.find(up => up._id === this.userPolicyId) || null;

        if (!this.userPolicy) {
          this.error = 'User policy not found';
          this.loading = false;
          return;
        }

        // Step 2: extract policyProductId
        const policyId =
          (this.userPolicy.policyProductId as any)?._id || this.userPolicy.policyProductId;

        if (!policyId) {
          this.error = 'No linked policy found';
          this.loading = false;
          return;
        }

        // Step 3: fetch the actual Policy details
        this.policyService.getPolicyDetails(policyId).subscribe({
          next: (res: Policy) => {
            this.policy = res;
            this.loading = false;
          },
          error: (err) => {
            console.error('❌ Error fetching policy:', err);
            this.error = 'Failed to load policy details';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('❌ Error fetching user policies:', err);
        this.error = 'Failed to load user policies';
        this.loading = false;
      }
    });
  }
    goBack(){
    this.router.navigate(['/home'])
  }
  backToDashboard() {
    this.router.navigate(['/home']);
  }
  cancelPolicy() {
  if (!this.userPolicyId) return;

  if (confirm('Are you sure you want to cancel this policy?')) {
    this.policyService.cancelPolicy(this.userPolicyId).subscribe({
      next: () => {
        alert('✅ Policy cancelled successfully');
        this.backToDashboard();
      },
      error: (err) => {
        console.error('❌ Error cancelling policy:', err);

        // Safely extract backend message if available
        const errorMessage =
          err?.error?.message || 'Failed to cancel policy. Please try again.';

        // Display to user instead of console
        alert(`❌ ${errorMessage}`);
      }
    });
  }
}


}
