import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isAuthenticated()) {
    return true; // If authenticated, allow access
  } else {
    router.navigate(['/login']); // If not authenticated, redirect to login
    return false; // Block access
  }
};
