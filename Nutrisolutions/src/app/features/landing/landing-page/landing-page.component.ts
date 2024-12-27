import { Component } from '@angular/core';
import { AppUtils } from 'src/app/core/utils/functions.utils';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  getCssVariable(variableName: string): string {
    return AppUtils.getCssVariable(variableName);
  }
}
