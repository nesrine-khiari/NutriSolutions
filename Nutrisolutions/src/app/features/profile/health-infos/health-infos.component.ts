import { Component } from '@angular/core';

@Component({
  selector: 'app-health-infos',
  templateUrl: './health-infos.component.html',
  styleUrls: ['./health-infos.component.css'],
})
export class HealthInfosComponent {
  weight: string = '50';
  height: string = '170';

  calculateBMI(): number {
    const weightKg = parseFloat(this.weight);
    const heightM = parseFloat(this.height) / 100; // Convert height to meters

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
