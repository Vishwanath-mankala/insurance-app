import { Component } from '@angular/core';
import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-policy-portal',
  imports: [CustomNavbarComponent, CardComponent],
  templateUrl: './policy-portal.component.html',
  styleUrl: './policy-portal.component.css'
})
export class PolicyPortalComponent {
  allPolicies:Policy[] = [];  
  userRole: string | undefined = 'customer' 
  constructor(private policyService:PolicyService,
    private authService:AuthService,
    private router:Router
  ){ 
     this.authService.user$.subscribe(user=>{
        this.userRole = user?.role
     })
  }
  ngOnInit() {
    this.policyService.refreshPolicies().subscribe(policies => {
      this.allPolicies = policies;
      console.log("123", this.allPolicies);
    });
  }
  viewPolicyDetails(id:number){
    this.router.navigate(['/policy-details', id]);
  }
  buyPolicy(id:number){
    this.router.navigate(['/buy-policy', id]);
  }

}
