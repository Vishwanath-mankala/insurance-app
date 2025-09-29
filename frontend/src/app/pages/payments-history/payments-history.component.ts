import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { InsuranceService } from '../../services/insurance.service';
import { Payments } from '../../models/payment';

@Component({
  selector: 'app-payments-history',
  standalone: true,
  imports: [CommonModule, CustomNavbarComponent],
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css']
})
export class PaymentsHistoryComponent implements OnInit {
  payments: Payments[] = [];
  loading = false;
  error: string | null = null;
  userRole: string = 'customer';

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  private fetchPayments(): void {
    this.loading = true;
    this.error = null;
    this.insuranceService.getRepayments().subscribe({
      next: (data) => {
        // If backend route returns all user payments, adapt here
        this.payments = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load payments';
        this.loading = false;
      }
    });
  }
}


