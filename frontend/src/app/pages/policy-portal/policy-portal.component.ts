import { Component } from '@angular/core';
import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';

@Component({
  selector: 'app-policy-portal',
  standalone: true,
  imports: [CustomNavbarComponent, CardComponent,CustomButtonComponent],
  templateUrl: './policy-portal.component.html',
  styleUrls: ['./policy-portal.component.css']
})
export class PolicyPortalComponent {
  allPolicies: Policy[] = [];
  userRole: string | undefined = 'customer';

  constructor(
    private policyService: PolicyService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.subscribe(user => {
      this.userRole = user?.role;
    });
  }

  ngOnInit() {
    this.policyService.getAllPolicies().subscribe(policies => {
      this.allPolicies = policies;
      console.log("Fetched Policies:", this.allPolicies);
    });
  }
  goBack(){
    this.router.navigate(['/home'])
  }
  viewPolicyDetails(id: string) {
    this.router.navigate(['/policy-details', id]);
  }

  buyPolicy(id: string) {
    this.router.navigate(['/buy-policy', id]);
  }
}
