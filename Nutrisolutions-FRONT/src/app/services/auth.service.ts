import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = true;
  private userRole: string = 'client';

  login(role: string): void {
    this.isAuthenticated = true;
    this.userRole = role; // 'admin', 'client', or 'nutritionist'
    localStorage.setItem('role', role);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = '';
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getUserRole(): string {
    return localStorage.getItem('role') || 'client';
  }
}
