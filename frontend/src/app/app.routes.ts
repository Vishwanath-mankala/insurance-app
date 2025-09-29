import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authRoleGuard } from './guards/auth-role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'policy-portal',
    loadComponent: () =>
      import('./pages/policy-portal/policy-portal.component').then(
        (m) => m.PolicyPortalComponent
      ),
    canActivate: [authGuard,authRoleGuard],
    data: { roles: ['customer', 'admin','agent'] },
  },
];
