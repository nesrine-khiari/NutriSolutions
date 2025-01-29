import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
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
  emailControl: FormControl = new FormControl('');
  toastr = inject(ToastrService);

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

  isRequestPopupVisible: boolean = false;

  showRequestPassPopup() {
    this.isRequestPopupVisible = true;
  }

  // Method to hide the popup
  closeRequestPopup = () => {
    this.isRequestPopupVisible = false;
    this.emailControl.reset();
  };

  sendResetPassRequest = () => {
    if (this.emailControl.valid)
      this.authService.resetPasswordRequest(this.emailControl.value).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.closeRequestPopup();
        },
        error: (err) => {
          this.toastr.error(AppUtils.getErrorMessage(err));
        },
      });
    this.emailControl.reset();
  };
}
