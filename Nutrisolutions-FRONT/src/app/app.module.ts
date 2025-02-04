import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CoreModule } from './core/core.module';
import { AuthModule } from './features/auth/auth.module';
import { HomeModule } from './features/home/home.module';
import { NutritionistsModule } from './features/nutritionists/nutritionists.module';
import { PlanningModule } from './features/planning/planning.module';
import { ProfileModule } from './features/profile/profile.module';
import { RecipesModule } from './features/recipes/recipes.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Notification duration (in ms)
      positionClass: 'toast-top-right', // Position of notifications
      preventDuplicates: true, // Prevent duplicate notifications
      closeButton: true, // Show close button in the notification
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
