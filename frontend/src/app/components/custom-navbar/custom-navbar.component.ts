import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface NavLink {
  label: string;
  path: string;
  roles?: string[];     // Allowed roles (optional)
  primary?: boolean;    // Highlight as primary button
  disabled?: boolean;   // Disable link
}

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent {
  @Input() brand: string = 'My App';
  @Input() links: NavLink[] = [];
  @Input() userRole: string | undefined = undefined; // Current user role

  /** Checks if the link should be visible for this role */
  isVisible(link: NavLink): boolean {
    if (!link.roles || link.roles.length === 0) {
      return true; // visible to everyone if no role restriction
    }
    return this.userRole ? link.roles.includes(this.userRole) : false;
  }

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
