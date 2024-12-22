import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { AuthInputFieldComponent } from './components/auth-input-field/auth-input-field.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { ButtonComponent } from './components/button/button.component';
import { AuthDropdownComponent } from './components/auth-dropdown/auth-dropdown.component';
import { AuthAccountTypeComponent } from './components/auth-account-type/auth-account-type.component';
import { SvgBoxComponent } from './components/svg-box/svg-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageBackgroundComponent } from './components/page-background/page-background.component';
import { RecetteItemComponent } from '../features/recipes/recette-item/recette-item.component';
import { StarComponent } from './components/star/star.component';
import { SearchComponent } from './components/search/search.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { RecipeDescriptionComponent } from './components/recipe-description/recipe-description.component';
@NgModule({
  declarations: [
    AuthBackgroundComponent,
    AuthInputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
    NavBarComponent,
    PageBackgroundComponent,
    RecetteItemComponent,
    StarComponent,
    SearchComponent,
    DropdownComponent,
    PaginationComponent,
    UploadImageComponent,
    InputFieldComponent,
    RecipeDescriptionComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    AuthBackgroundComponent,
    AuthInputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
    NavBarComponent,
    PageBackgroundComponent,
    RecetteItemComponent,
    PaginationComponent,
    UploadImageComponent,
    StarComponent,
    SearchComponent,
    DropdownComponent,
    InputFieldComponent,
    RecipeDescriptionComponent
  ],
})
export class SharedModule {}
