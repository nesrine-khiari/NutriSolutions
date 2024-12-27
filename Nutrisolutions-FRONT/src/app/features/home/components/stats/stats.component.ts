import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  @Input() statObject: string = 'Nouveaux Patients';
  @Input() stat: number = 40;
  @Input() evolutionPercent: number = 51;

  isIncreasing: boolean = false;

  hovered: boolean = false;
  ngOnInit() {
    this.isIncreasing = this.evolutionPercent > 0;
  }
}
