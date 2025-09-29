import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";

@Component({
  selector: 'app-home',
  imports: [CustomButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public router:Router){ }
  navigateToPolicies(){
    this.router.navigate(['/policy-portal']);
  }
}
