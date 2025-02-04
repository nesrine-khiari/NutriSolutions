import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning/planning.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [PlanningComponent],
  imports: [CommonModule, SharedModule, FormsModule, CoreModule],
  exports: [PlanningComponent],
})
export class PlanningModule {}
