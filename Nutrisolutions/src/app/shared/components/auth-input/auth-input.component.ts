import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.css'],
})
export class AuthInputComponent {
  @Input({ required: true }) heading!: string;
  @Input() placeholder: string = 'Type Something..';
  @Input({ required: true }) type!: string;

  isPassword: boolean = false;
  showPassword: boolean = false;

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  getType(): string {
    return this.isPassword && !this.showPassword ? 'password' : 'text';
  }
}
