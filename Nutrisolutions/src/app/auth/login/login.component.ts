import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/auth-common.css', './login.component.css'],
})
export class LoginComponent {
  userEmail: string = '';
}
