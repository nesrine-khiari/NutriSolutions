import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';



@NgModule({
  declarations: [
    AuthBackgroundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthBackgroundComponent
  ]

})
export class SharedModule { }
