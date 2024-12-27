import { Component, inject, Input, OnInit } from '@angular/core';
import {
  generateFakeClient,
  generateFakeRecipe,
} from 'src/app/core/helpers/faker.helper';
import { ClientModel } from 'src/app/models/client.model';
import { RecipeModel } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  @Input() fullname: string = 'Nesrine Khiari';
  @Input() role: string = 'Client';
  recipesService = inject(RecipesService);
  client: ClientModel | undefined;
  recettes: RecipeModel[] | undefined;
  clientInfoItems: { icon: string; param: string }[] = [];

  ngOnInit() {
    this.client = generateFakeClient();
    this.recettes = this.recipesService.generateFakeRecipesList(4);
    this.clientInfoItems = [
      { icon: 'fa-solid fa-user', param: this.client?.gender ?? 'N/A' },
      {
        icon: 'fa-solid fa-cake-candles',
        param: this.client?.age ? this.client?.age.toString() + ' ans' : 'N/A',
      },
      {
        icon: 'fa-solid fa-location-dot',
        param: this.client?.address ?? 'N/A',
      },
      { icon: 'fa-solid fa-envelope', param: this.client?.email ?? 'N/A' },
      { icon: 'fa-solid fa-phone', param: this.client?.phone ?? 'N/A' },
    ];
  }


}
