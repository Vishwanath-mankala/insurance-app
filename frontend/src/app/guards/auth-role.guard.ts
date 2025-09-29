import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  // Define roles allowed for this route in your route config
  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  return auth.user$.pipe(
    map(user => {
      const userRole : string | undefined = user?.role;
      // if(userRole==='admin'){
      //   router.navigate(['/admin'])
      //   return false
      // }
      if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        // 🚫 User doesn't have access → redirect
        router.navigate(['/']);
        return false;
      }

      // ✅ Access granted
      return true;
    })
  );
};
