import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router service
  console.log('====================================');
  console.log('route'+route);
  console.log('====================================');
  if (authService.isLoggedIn()) {
    return true; // Allow access if the user is logged in
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
