import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientModel } from 'src/app/models/client.model';
import { RecipeModel } from 'src/app/models/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  recipesService = inject(RecipesService);
  client: ClientModel | null = null;
  recettes: RecipeModel[] | undefined;
  clientInfoItems: { icon: string; param: string }[] = [];
  authService = inject(AuthService);
  clientService = inject(ClientService);
  toastr = inject(ToastrService);
  constructor() {
    this.clientService.getClientById(this.authService.getUserId()).subscribe({
      next: (response) => {
        this.client = response;

        this.updateClientInfoItems();
      },
      error: (err) => {
        console.error('Upload Failed:', err);
        this.toastr.error('Image upload failed. Please try again.');
      },
    });
  }

  ngOnInit() {
    this.recettes = this.recipesService.generateFakeRecipesList(4);
  }

  updateClientInfoItems() {
    if (this.client) {
      const age = AppUtils.getAge(this.client.birthDate).toString() + ' ans';
      this.clientInfoItems = [
        { icon: 'fa-solid fa-user', param: this.client.gender ?? 'N/A' },
        {
          icon: 'fa-solid fa-cake-candles',
          param: age,
        },
        { icon: 'fa-solid fa-envelope', param: this.client.email ?? 'N/A' },
        { icon: 'fa-solid fa-phone', param: this.client.phoneNumber ?? 'N/A' },
      ];
    }
  }
}
