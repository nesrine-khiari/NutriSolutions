import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() type: string = 'submit';
  @Input() width: string = '100%';
  @Input({ required: true }) text!: string;
  @Input() backgroundColor: string = '';
  @Input() boxShadow: string = '';
  @Input() textColor: string = 'white';
  @Input() borderRadius: string = '8px';

  isHovered: boolean = false;

  ngOnInit(): void {
    // If no backgroundColor is provided, use the CSS variable
    if (!this.backgroundColor) {
      this.backgroundColor = this.getCssVariable('--secondary-color');
    }

    this.boxShadow = this.boxShadow
      ? this.boxShadow
      : '0 4px 8px 2px' + this.getCssVariable('--secondary-color');
  }

  private getCssVariable(variableName: string): string {
    // Fetch the root element's styles
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
}
