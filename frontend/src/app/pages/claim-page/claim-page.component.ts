import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsuranceService } from '../../services/insurance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-claim-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './claim-page.component.html',
  styleUrls: ['./claim-page.component.css']
})
export class ClaimPageComponent {
  incidentDate: string = '';
  description: string = '';
  amountClaimed: number | null = null;
  userPolicyId:string=''

  constructor(
    private insuranceService: InsuranceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit(): void {
    // extract policy id from url param
    this.userPolicyId = this.route.snapshot.paramMap.get('id') || '';
  }

  submitClaim() {
    if (!this.incidentDate || !this.description || !this.amountClaimed) {
      alert('Please fill in all fields');
      return;
    }

    const claimData = {
      userPolicyId:this.userPolicyId,
      incidentDate: this.incidentDate,
      description: this.description,
      amountClaimed: this.amountClaimed
    };

    this.insuranceService.submitClaim(claimData).subscribe({
      next: (res) => {
        alert('✅ Claim submitted successfully');
        console.log('Response:', res);
        this.router.navigate(['/home']); // redirect after submit
      },
      error: (err) => {
        console.error('❌ Error submitting claim:', err);
        alert('Failed to submit claim. Please try again.');
      }
    });
  }
}
