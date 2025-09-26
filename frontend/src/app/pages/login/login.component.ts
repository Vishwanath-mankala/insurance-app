import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email:string='';
password:string='';
message:string='';
loading:boolean=false;
constructor(private auth :AuthService,public router:Router){}
login(){
  this.loading=true;
  this.auth.login(this.email,this.password).pipe(
    finalize(()=>{
      this.loading=false;
    })
  ).subscribe({
    next:(res)=>{
      this.message = 'Login successful! Redirecting...';
      setTimeout(()=>{
        this.router.navigate(['/']);
      },2000)
    },
    error:(err)=>{
      this.message = err.error.message || 'Login failed. Please try again.';
    }
  })
}
}
