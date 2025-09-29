import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { PolicyService } from '../../services/policy.service';
import { InsuranceService } from '../../services/insurance.service';
import { UserPolicy } from '../../models/user-policy';
import { Claim } from '../../models/claim';
import { Payments } from '../../models/payment';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { Policy } from '../../models/policy';
import { forkJoin } from 'rxjs';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CurrencyPipe,
    DatePipe,
    CustomButtonComponent,
    CustomNavbarComponent,
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashboardComponent implements OnInit {
  userPolicies: UserPolicy[] = [];
  userRole: string | undefined = 'customer';
  claims: Claim[] = [];
  repayments: Payments[] = [];
  policies: Policy[] = [];

  // derived stats
  totalPolicies = 0;
  activePolicies = 0;
  totalClaims = 0;
  pendingClaims = 0;

  constructor(
    private policyService: PolicyService,
    private insuranceService: InsuranceService,
    private authService : AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(
      user => {
        this.userRole = user?.role;
        
        // Redirect admin users to admin page
        if (user?.role === 'admin') {
          this.router.navigate(['/admin']);
          return;
        }
        
        // Load dashboard data for non-admin users
        this.loadDashboardData();
      }
    );
  }

  private loadDashboardData(): void {
    forkJoin({
      policies: this.policyService.getAllPolicies(),
      userPolicies: this.policyService.getUserPolicies(),
      claims: this.insuranceService.getClaims(),
      repayments: this.insuranceService.getRepayments(),
    }).subscribe(({ policies, userPolicies, claims, repayments }) => {
      this.policies = policies;
      this.userPolicies = userPolicies;
      this.claims = claims;

      console.log('📌 Policies:', this.policies);
      console.log('📌 User Policies:', this.userPolicies);
      console.log('📌 User Claimed Policies:', this.claims);

      // derived stats
      this.totalPolicies = this.userPolicies.length;
      this.activePolicies = this.userPolicies.filter(
        (p) => p.status === 'active'
      ).length;

      this.totalClaims = claims.length;
      this.pendingClaims = claims.filter((c) => c.status === 'PENDING').length;

      this.repayments = repayments;
    });
  }

  /** Resolve a policy title by matching IDs */
  findTitle(id: string): string {
    if (!id || !this.policies.length) return 'Unknown Policy';

    const policy = this.policies.find(
      (p) => p._id == id // handle MongoDB { _id: { $oid: '...' } }
    );

    console.log('🔍 Looking for:', id, '➡ Matched:', policy);
    return policy ? policy.title : 'Unknown Policy';
  }
  findClaimTitle(userPolicyId: any): string {

    const up = this.userPolicies.find((u) => u._id == userPolicyId);
    return up?.policyProductId?.title || 'Unknown Policy';
  }
  toDetails(id:string){
    this.router.navigate(['/policy-details',id])
  }
  /** Navigate to policy portal */
  toPolicyPortal(): void {
    this.router.navigate(['/policy-portal']);
  }

  toRepay(id: string) {
    this.router.navigate(['/repay-policy', id]);
  }
  toSubmitClaim(id: string) {
    this.router.navigate(['/claim-policy', id]);
  }
}
