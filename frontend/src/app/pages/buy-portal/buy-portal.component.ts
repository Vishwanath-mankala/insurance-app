import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-buy-portal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buy-portal.component.html',
  styleUrls: ['./buy-portal.component.css'],
})
export class BuyPortalComponent {
  termMonths: number = 0;
  nominee = {
    name: '',
    relation: '',
  };
  assignedAgentId: string = '';
  policyId: string = '';

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // extract policy id from url param
    this.policyId = this.route.snapshot.paramMap.get('id') || '';
  }

  buyPolicy(): void {
    if (!this.policyId || !this.nominee.name || !this.nominee.relation) {
      alert('Please fill all required fields');
      return;
    }

    this.policyService
      .purchasePolicy(this.policyId, {
        termMonths: this.termMonths,
        nominee: this.nominee,
        assignedAgentId: this.assignedAgentId || undefined,
      })
      .subscribe({
        next: (res) => {
          alert('Policy purchased successfully!');
          this.router.navigate(['/policy-portal']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to purchase policy');
        },
      });
  }
}
