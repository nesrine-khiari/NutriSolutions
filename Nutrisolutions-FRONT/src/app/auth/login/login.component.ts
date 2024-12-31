import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/auth-common.css', './login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  authService = inject(AuthService);
  setEmail(event: string) {
    console.log('Email set');

    this.email = event;
  }
  setPassword(event: string) {
    console.log('password set');

    this.password = event;
  }
  connexion = () => {
    this.authService.login(this.email, this.password);
  };
}
