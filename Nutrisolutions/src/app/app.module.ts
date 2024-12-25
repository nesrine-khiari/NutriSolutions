import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesModule } from './features/recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { NutritionistsModule } from './features/nutritionists/nutritionists.module';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './features/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanningComponent } from './features/planning/planning.component';

@NgModule({
  declarations: [AppComponent, PlanningComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    RecipesModule,
    NutritionistsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Notification duration (in ms)
      positionClass: 'toast-top-right', // Position of notifications
      preventDuplicates: true, // Prevent duplicate notifications
      closeButton: true, // Show close button in the notification
    }),
    HomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
