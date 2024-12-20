import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { ButtonComponent } from './components/button/button.component';
import { AuthDropdownComponent } from './components/auth-dropdown/auth-dropdown.component';
import { AuthAccountTypeComponent } from './components/auth-account-type/auth-account-type.component';
import { SvgBoxComponent } from './components/svg-box/svg-box.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageBackgroundComponent } from './components/page-background/page-background.component';
import { RecetteItemComponent } from './components/recette-item/recette-item.component';
import { SearchComponent } from './components/search/search.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
@NgModule({
  declarations: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
    NavBarComponent,
    PageBackgroundComponent,
    RecetteItemComponent,
    SearchComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
    NavBarComponent,
    PageBackgroundComponent,
    RecetteItemComponent,
    SearchComponent,
    DropdownComponent,
  ],
})
export class SharedModule {}
