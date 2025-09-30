import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { InsuranceService } from '../../services/insurance.service';
import { Payments } from '../../models/payment';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payments-history',
  standalone: true,
  imports: [CommonModule, CustomNavbarComponent, CustomButtonComponent],
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css'],
})
export class PaymentsHistoryComponent implements OnInit {
  payments: Payments[] = [];
  loading = false;
  error: string | null = null;
  userRole: string = 'customer';
  policies: Policy[] = [];

  constructor(
    private insuranceService: InsuranceService,
    private policyService: PolicyService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchPayments();
    this.policyService.getAllPolicies().subscribe((policy) => {
      this.policies = policy;
    });
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']); // fallback
    }
  }

  findTitle(userPolicyId: string): string {
    const policyFound = this.policies.find((p) => p._id === userPolicyId);
    return policyFound?.title || 'Unknown Policy';
  }

  private fetchPayments(): void {
    this.loading = true;
    this.error = null;
    this.insuranceService.getRepayments().subscribe({
      next: (data) => {
        this.payments = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load payments';
        this.loading = false;
      },
    });
  }
}
