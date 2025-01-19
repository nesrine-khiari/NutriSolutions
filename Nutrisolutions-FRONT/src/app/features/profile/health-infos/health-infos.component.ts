import { Component, Input, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-health-infos',
  templateUrl: './health-infos.component.html',
  styleUrls: ['./health-infos.component.css'],
})
export class HealthInfosComponent {
  @Input({ required: true }) client!: ClientModel;
  calculateBMI(): number {
    const weightKg = this.client.weight;
    const heightM = this.client.height / 100; // Convert height to meters

    if (!weightKg || !heightM) {
      throw new Error('Invalid weight or height values');
    }

    return +(weightKg / (heightM * heightM)).toFixed(2); // BMI formula with 2 decimal precision
  }
  getBMIStatus(): string {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Healthy';
    } else {
      return 'Not Healthy';
    }
  }
}
