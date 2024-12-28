import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoggerService } from 'src/app/services/logger.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject services
  const router = inject(Router);
  const logger = inject(LoggerService);
  const requiredRoles = route.data?.['roles'] as string[]; // Get roles from route data
  const userRole = authService.getUserRole();

  if (requiredRoles.includes(userRole)) {
    logger.log('Role guard granted access' + userRole);
    return true; // Grant access if user role matches
  }
  logger.error('Role guard denied access' + userRole);
  router.navigate(['/']); // Redirect to home or another route
  return false; // Deny access
};
