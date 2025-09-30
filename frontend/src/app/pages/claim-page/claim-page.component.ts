import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsuranceService } from '../../services/insurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { Policy } from '../../models/policy';
import { UserPolicy } from '../../models/user-policy';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-claim-page',
  standalone: true,
  imports: [FormsModule, CommonModule,CustomNavbarComponent],
  templateUrl: './claim-page.component.html',
  styleUrls: ['./claim-page.component.css']
})
export class ClaimPageComponent {
  incidentDate: string = '';
  description: string = '';
  amountClaimed: number | null = null;
  userPolicyId:string=''
  userPolicies:UserPolicy[] = []
  policies:Policy[]=[]
  minInsured:any=''


  constructor(
    private insuranceService: InsuranceService,
    private policyService:PolicyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

 ngOnInit(): void {
  // extract policy id from url param
  this.userPolicyId = this.route.snapshot.paramMap.get('id') || '';

  // fetch all policies
  this.policyService.getAllPolicies().subscribe(p => {
    this.policies = p;
    this.findMinIns(this.userPolicyId);
  });

  // fetch user policies
  this.policyService.getUserPolicies().subscribe(up => {
    this.userPolicies = up;
    this.findMinIns(this.userPolicyId);
  });
}

findMinIns(userPId: string) {
  if (!userPId || !this.userPolicies.length || !this.policies.length) {
    return;
  }

  // find the userPolicy by id
  const userPolicy = this.userPolicies.find(up => up._id === userPId);
  if (!userPolicy) {
    console.warn('UserPolicy not found for id:', userPId);
    return;
  }

  // find the linked policyProduct
  const policy = this.policies.find(p => p._id === userPolicy.policyProductId._id);
  if (policy) {
    this.minInsured = policy.minSumInsured;
    console.log('✅ minSumInsured:', this.minInsured);
  }
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
