import { Component } from '@angular/core';
import { InsuranceService } from '../../services/insurance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repayment-page',
  imports: [FormsModule,CommonModule],
  templateUrl: './repayment-page.component.html',
  styleUrl: './repayment-page.component.css'
})
export class RepaymentPageComponent {

  constructor(private insuranceService:InsuranceService,private router:Router,
        private route: ActivatedRoute,

  ){ }
  amount: number = 8000; // default amount
  method: string = 'SIMULATED'; // default method

  paymentMethods: string[] = ['SIMULATED', 'UPI', 'CARD', 'NETBANKING'];
  userPolicyId:string=''
  ngOnInit(){
        this.userPolicyId = this.route.snapshot.paramMap.get('id') || '';

  }
  makePayment() {
    if (!this.amount || !this.method) {
      alert('Please select a method and enter amount.');
      return;
    }

    const paymentData = {
      userPolicyId:this.userPolicyId,
      amount: this.amount,
      method: this.method
    };

    console.log('💳 Payment Data:', paymentData);

    // Normally call backend API:
    this.insuranceService.recordPayment(paymentData).subscribe(
    {
      next:(res)=>{
      alert(`✅ Payment of ₹${this.amount} via ${this.method} successful!`);
      console.log("res:",res)
      this.router.navigate(['/home']);

      }
    }
    )

  }
}



