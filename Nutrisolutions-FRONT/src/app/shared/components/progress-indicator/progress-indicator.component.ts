import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.css'],
})
export class ProgressIndicatorComponent {
  @Input() steps: string[] = [];
  @Input() activeStep: number = 0;
}
