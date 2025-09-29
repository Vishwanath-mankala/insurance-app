import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";
import { finalize } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, CustomButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'customer';
  message: string = '';
  loading:boolean=false;
  constructor(private auth: AuthService, public router: Router) {}
  register() {
    this.loading=true;
    this.auth
      .register(this.name, this.email, this.password, this.role).pipe(
        finalize(() => {
          this.loading = false; // This will run on success OR error
        }))
      .subscribe({
        next: (user) => {
          this.message = 'Registration successful! Please log in.';
          // console.log(user);
          setTimeout(() => {
            this.loading=false;
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.message =
            err.error.message || 'Registration failed. Please try again.';
        },
      });
  }
}
