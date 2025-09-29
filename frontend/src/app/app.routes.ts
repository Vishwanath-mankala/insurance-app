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
      import('./pages/dash-board/dash-board.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'policy-portal',
    loadComponent: () =>
      import('./pages/policy-portal/policy-portal.component').then(
        (m) => m.PolicyPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer', 'admin', 'agent'] },
  },
  {
    path: 'buy-policy/:id',
    loadComponent: () =>
      import('./pages/buy-portal/buy-portal.component').then(
        (m) => m.BuyPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer', 'admin', 'agent'] },
  },
  {
    path: 'repay-policy/:id',
    loadComponent: () =>
      import('./pages/repayment-page/repayment-page.component').then(
        (m) => m.RepaymentPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer'] },
  },
    {
    path: 'claim-policy/:id',
    loadComponent: () =>
      import('./pages/claim-page/claim-page.component').then(
        (m) => m.ClaimPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer'] },
  },
];
