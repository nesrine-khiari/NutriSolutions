import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../../assets/css/auth-common.css'],
})
export class ResetPasswordComponent {
  actRoute = inject(ActivatedRoute);
  resetToken = this.actRoute.snapshot.params['resetToken'];

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  setOldPassword(event: string) {
    this.oldPassword = event;
  }
  setNewPassword(event: string) {
    this.newPassword = event;
  }
  setConfirmNewPassword(event: string) {
    this.confirmNewPassword = event;
  }

  resetPassword = () => {
    if (this.oldPassword && this.newPassword && this.confirmNewPassword) {
      if (this.newPassword == this.confirmNewPassword) {
        this.authService
          .resetPassword(this.resetToken, this.oldPassword, this.newPassword)
          .subscribe({
            next: (response) => {
              this.toastr.success('Réinitialisation du mot de passe réussie');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.toastr.error(AppUtils.getErrorMessage(err));
            },
          });
      } else {
        this.toastr.error('Les mots de passe ne correspondent pas');
      }
    }
  };
}
