import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-water-tracking',
  templateUrl: './water-tracking.component.html',
  styleUrls: ['./water-tracking.component.css'],
})
export class WaterTrackingComponent {
  filledCups: number = -1;
  recommendedDrunCups = 0;
  waterTrackingStatus: WaterTrackingStatus = WaterTrackingStatus.NEUTRAL;
  currentTime: string = '';
  private intervalId: any;
  private timeIntervalId: any;
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.updateStatus();
    this.currentTime = this.getCurrentTime();
    this.timeIntervalId = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 30000);
    // Set the interval to run every 30 seconds (30000 milliseconds)
    this.intervalId = setInterval(() => {
      this.recommendedDrunCups++;
      this.toastr.info("Don't forget to Hydrate yourself!", 'Water Tracker');
      this.updateStatus();
      console.log('CHECKING');
    }, 15000);
  }
  getCurrentHour(): string {
    const currentDate = new Date(); // Get the current date and time
    return currentDate.getHours().toString().padStart(2, '0'); // Extract the current hour (0-23)
  }
  getCurrentMinutes(): string {
    const currentDate = new Date(); // Get the current date and time
    return currentDate.getMinutes().toString().padStart(2, '0'); // Extract the current hour (0-23)
  }
  getCurrentTime(): string {
    return this.getCurrentHour() + ':' + this.getCurrentMinutes();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
    }
  }
  showWarning() {
    this.toastr.warning(
      'Warning message',
      "Don't Forget To Hydrate Your Self !"
    );
  }
  fillNextCup() {
    if (this.filledCups < 7) this.filledCups++;
    this.updateStatus();
  }

  updateStatus() {
    const difference = this.recommendedDrunCups - this.filledCups;
    switch (difference) {
      case 0:
        this.waterTrackingStatus = WaterTrackingStatus.VERY_HAPPY;
        break;
      case 1:
        this.waterTrackingStatus = WaterTrackingStatus.HAPPY;
        break;
      case 2:
        this.waterTrackingStatus = WaterTrackingStatus.NEUTRAL;

        break;
      case 3:
        this.waterTrackingStatus = WaterTrackingStatus.SAD;

        break;
      case 4:
        this.waterTrackingStatus = WaterTrackingStatus.VERY_SAD;
        this.showWarning();
        break;

      default:
        break;
    }
  }
}

export enum WaterTrackingStatus {
  VERY_HAPPY = 'very-happy',
  HAPPY = 'happy',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  VERY_SAD = 'very-sad',
}
